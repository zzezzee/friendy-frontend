import { useEffect } from 'react';
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

  useEffect(() => {
    chatStore.fetchChats(chatRoomId);
  }, [chat]);

  return ((
    <Container>
      <h1>채팅</h1>
      <Chats />
      <ChatInputForm />
    </Container>
  ));
}
