package com.manantara.webapp.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class FileController {

    public static final String SQLITE_DB = "data.db";

    @RequestMapping(value = "info", method = RequestMethod.GET)
    public String info() {
        return "The application is up...";
    }
    
    @PostMapping("/upload")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<String> uploadCsv(@RequestParam("file") MultipartFile file) {
        try {

            Path tempFile = Files.createTempFile("upload-", ".csv");
            file.transferTo(tempFile.toFile());

            String tableName = "t_" + UUID.randomUUID().toString().replace("-", "");

            Connection conn = DriverManager.getConnection("jdbc:duckdb:");
            Statement stmt = conn.createStatement();

            stmt.execute("""
                CREATE TABLE %s AS
                SELECT * FROM read_csv_auto('%s');
            """.formatted(tableName, tempFile.toAbsolutePath()));

            stmt.execute("""
                ATTACH '%s' AS sqlite_db (TYPE SQLITE);
            """.formatted(SQLITE_DB));

            //TODO: move the line of code below to a separate app startup layer
            ensureMetadataTable();

            stmt.execute("""
                CREATE TABLE sqlite_db.%s AS
                SELECT * FROM %s;
            """.formatted(tableName, tableName));

            long now = System.currentTimeMillis();

            stmt.execute("""
                INSERT INTO sqlite_db.table_metadata (table_name, created_at)
                VALUES ('%s', %d);
            """.formatted(tableName, now));

            conn.close();

            Files.deleteIfExists(tempFile);

            return ResponseEntity.ok(tableName);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getschema/{tableName}")
    public ResponseEntity<Map<String, Object>> getSchema(@PathVariable String tableName) {
        String sqliteUrl = "jdbc:sqlite:data.db";
        StringBuilder schema = new StringBuilder();
        Map<String, Object> response = new HashMap<>();

        schema.append(String.format("Schema for database %s\n", tableName));

        try (Connection conn = DriverManager.getConnection(sqliteUrl);
            PreparedStatement schemaStmt = conn.prepareStatement(
                    "PRAGMA table_info(" + tableName + ")"
            );
            PreparedStatement sampleStmt  = conn.prepareStatement(
                String.format("SELECT * FROM %s LIMIT 3;", tableName)
            );
            ResultSet rs = schemaStmt.executeQuery();
            ResultSet rs2 = sampleStmt.executeQuery()) {

            while (rs.next()) {
                schema.append(rs.getString("name"))
                        .append(" ")
                        .append(rs.getString("type"))
                        .append("\n");
            }

            ResultSetMetaData meta = rs2.getMetaData();
            int columnCount = meta.getColumnCount();
            
            schema.append("\n");
            schema.append("Example rows:");
            while (rs2.next()) {
                for (int i = 1; i <= columnCount; i++) {
                    schema.append(meta.getColumnName(i))
                        .append("=")
                        .append(rs2.getObject(i));

                    if (i < columnCount) {
                        schema.append(", ");
                    }
                }
                schema.append("\n");
            }
            response.put("schema", schema.toString());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/executequery")
    public ResponseEntity<Map<String, Object>> executeQuery(@RequestParam("query") String query) {
        String sqliteUrl = "jdbc:sqlite:data.db";
        Map<String, Object> response = new HashMap<>();

        try (Connection conn = DriverManager.getConnection(sqliteUrl);
            PreparedStatement stmt  = conn.prepareStatement(query);
            ResultSet rs = stmt.executeQuery()) {

            ResultSetMetaData meta = rs.getMetaData();
            int columnCount = meta.getColumnCount();

            List<String> columns = new ArrayList<>();
            for (int i = 1; i <= columnCount; i++) {
                columns.add(meta.getColumnName(i));
            }

            List<Map<String, String>> rows = new ArrayList<>();

            while (rs.next()) {
                Map<String, String> row = new LinkedHashMap<>();

                for (int i = 1; i <= columnCount; i++) {
                    row.put(columns.get(i - 1), rs.getObject(i).toString());
                }

                rows.add(row);
            }

            response.put("columns", columns);
            response.put("rows", rows);
    
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    private void ensureMetadataTable() throws SQLException {
        String sqliteUrl = "jdbc:sqlite:data.db";
        
        try (Connection conn = DriverManager.getConnection(sqliteUrl);
            Statement stmt = conn.createStatement()) {

            stmt.execute("""
                CREATE TABLE IF NOT EXISTS table_metadata (
                    table_name TEXT PRIMARY KEY,
                    created_at INTEGER NOT NULL
                );
            """);

            System.out.println("Metadata table ensured.");
        }
    }
}
