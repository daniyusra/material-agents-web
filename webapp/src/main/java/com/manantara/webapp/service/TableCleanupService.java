package com.manantara.webapp.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class TableCleanupService {
    @Scheduled(fixedRate = 3600000) // every hour
    public void deleteOldTables() {
        String sqliteUrl = "jdbc:sqlite:data.db";

        try (Connection conn = DriverManager.getConnection(sqliteUrl);
            Statement stmt = conn.createStatement()) {

            long twoHours = 2 * 60 * 60 * 1000;
            long threshold = System.currentTimeMillis() - twoHours;

            ResultSet rs = stmt.executeQuery("""
                SELECT table_name FROM table_metadata
                WHERE created_at < %d;
            """.formatted(threshold));

            while (rs.next()) {
                String tableName = rs.getString("table_name");

                if (!tableName.matches("t_[a-zA-Z0-9]+")) {
                    System.out.println(String.format("Table skipped due to invalid name. Table name=%s", tableName));
                    continue; // safety check
                }

                stmt.execute("DROP TABLE IF EXISTS " + tableName);
                stmt.execute("DELETE FROM table_metadata WHERE table_name = '" + tableName + "'");

                System.out.println("Deleted old table: " + tableName);
            }

            System.out.println("Table cleanup job ran.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
