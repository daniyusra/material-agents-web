package com.manantara.webapp.entity.chat;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ChatResponse {
    private String reply;

    @JsonProperty("thread_id")
    private String threadId;

    @JsonProperty("image_base64")
    private String imageBase64;

    // getters & setters
    public String getReply() {
        return reply;
    }
    public void setReply(String reply) {
        this.reply = reply;
    }
    
    public String getThreadId() {
        return threadId;
    }
    public void setThreadId(String thread_id) {
        this.threadId = thread_id;
    }
    
    public String getImageBase64() {
        return imageBase64;
    }
    public void setImageBase64(String image_base64) {
        this.imageBase64 = image_base64;
    }
}
