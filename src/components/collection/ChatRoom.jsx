import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useChatStore from '../../hooks/useChatStore';
import ChatInputForm from './ChatInputForm';
import Chats from './Chats';

const Container = styled.div`
  height: 90%;
`;

export default function ChatRoom({ chatRoomId }) {
  const chatStore = useChatStore();

  const { chat } = chatStore;

  useEffect(() => {
    chatStore.connect({ chatRoomId });

    return () => {
      if (chatStore.connected) {
        chatStore.disconnect();
      }
    };
  }, []);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    chatStore.fetchChats(chatRoomId);
    scrollToBottom();
  }, [chat]);

  return ((
    <Container>
      <Chats messagesEndRef={messagesEndRef} />
      <ChatInputForm scrollToBottom={scrollToBottom} />
    </Container>
  ));
}
