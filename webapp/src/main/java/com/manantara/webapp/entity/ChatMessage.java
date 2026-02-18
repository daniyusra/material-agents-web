package com.manantara.webapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userInput;

    private String generatedResponse;

    // getters & setters
    public String getUserInput() {
        return userInput;
    }

    public String getGeneratedResponse() {
        return generatedResponse;
    }

    public void setUserInput(String userInput) {
        this.userInput = userInput;
    }

    public void setGeneratedResponse(String generatedResponse) {
        this.generatedResponse = generatedResponse;
    }
}