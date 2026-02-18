package com.manantara.webapp.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manantara.webapp.entity.ChatMessage;
import com.manantara.webapp.service.ChatMessageService;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatMessageController {
    private final ChatMessageService service;

    public ChatMessageController(ChatMessageService service) {
        this.service = service;
    }

    @PostMapping
    public ChatMessage create(@RequestBody Map<String, String> body) {
        String input = body.get("input");
        return service.saveMessage(input);
    }
}
