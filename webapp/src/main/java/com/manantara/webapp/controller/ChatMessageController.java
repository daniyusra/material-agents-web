package com.manantara.webapp.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manantara.webapp.entity.chat.ChatRequest;
import com.manantara.webapp.entity.chat.ChatResponse;
import com.manantara.webapp.service.ChatMessageService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatMessageController {
    private final ChatMessageService service;

    public ChatMessageController(ChatMessageService service) {
        this.service = service;
    }

    @PostMapping
    public Mono<ChatResponse> create(@RequestBody ChatRequest request) {
        return service.callAndStore(request);
    }
}
