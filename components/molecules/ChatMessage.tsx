import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
  isMe: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isMe }) => {
  return (
    <div style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', marginBottom: '1rem' }}>
      <div style={{
        maxWidth: '70%', padding: '0.75rem', borderRadius: '1rem',
        background: isMe ? 'var(--color-primary)' : 'white',
        color: isMe ? 'white' : 'var(--text-main)',
        border: isMe ? 'none' : '1px solid var(--border-color)',
        borderBottomRightRadius: isMe ? 0 : '1rem',
        borderBottomLeftRadius: isMe ? '1rem' : 0,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{message.text}</p>
        <p style={{ fontSize: '0.625rem', textAlign: 'right', color: isMe ? 'rgba(255,255,255,0.8)' : 'var(--text-light)' }}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};