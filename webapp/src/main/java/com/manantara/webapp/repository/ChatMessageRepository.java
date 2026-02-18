package com.manantara.webapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manantara.webapp.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
}