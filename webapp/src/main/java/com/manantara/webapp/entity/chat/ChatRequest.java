package com.manantara.webapp.entity.chat;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ChatRequest {
    private String message;

    @JsonProperty("thread_id")
    private String threadId;

    @JsonProperty("table_name")
    private String tableName;

    // getters & setters
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getTableName() {
        return tableName;
    }
    public void setTableName(String table_name) {
        this.tableName = table_name;
    }

    public String getThreadId() {
        return threadId;
    }
    public void setThreadId(String thread_id) {
        this.threadId = thread_id;
    }
}