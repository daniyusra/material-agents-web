package com.manantara.webapp.service;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.manantara.webapp.entity.ChatMessage;
import com.manantara.webapp.entity.chat.ChatRequest;
import com.manantara.webapp.entity.chat.ChatResponse;
import com.manantara.webapp.repository.ChatMessageRepository;

import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
public class ChatMessageService {

    private final ChatMessageRepository repository;
    private final WebClient webClient;

    public ChatMessageService(ChatMessageRepository repository, WebClient webClient) {
        this.repository = repository;
        this.webClient = webClient;
    }

    public ChatMessage saveMessage(String input, String response) {
        ChatMessage message = new ChatMessage();
        message.setUserInput(input);
        message.setGeneratedResponse(response);

        return repository.save(message);
    }

    public Mono<ChatResponse> callPythonChatReactive(ChatRequest request) {
        return webClient.post()
                .uri("/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatResponse.class);
    }

    public Mono<ChatResponse> callAndStore(ChatRequest request) {
        return callPythonChatReactive(request)
                .flatMap(response -> 
                    Mono.fromCallable(() -> {
                        saveMessage(request.getMessage(), response.getReply());
                        return response;
                    })
                    .subscribeOn(Schedulers.boundedElastic()) // isolate blocking work
                );
    }
}

