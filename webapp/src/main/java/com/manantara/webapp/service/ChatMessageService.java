package com.manantara.webapp.service;

import org.springframework.stereotype.Service;

import com.manantara.webapp.entity.ChatMessage;
import com.manantara.webapp.repository.ChatMessageRepository;

@Service
public class ChatMessageService {

    private final ChatMessageRepository repository;

    public ChatMessageService(ChatMessageRepository repository) {
        this.repository = repository;
    }

    public ChatMessage saveMessage(String input) {

        String generated = generateResponse(input);

        ChatMessage message = new ChatMessage();
        message.setUserInput(input);
        message.setGeneratedResponse(generated);

        return repository.save(message);
    }

    private String generateResponse(String input) {
        return "You typed: " + input.toUpperCase();
    }
}
