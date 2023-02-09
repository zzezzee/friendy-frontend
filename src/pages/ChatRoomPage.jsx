import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatRoom from '../components/collection/ChatRoom';
import useChatStore from '../hooks/useChatStore';
import useUserStore from '../hooks/useUserStore';

export default function ChatRoomPage() {
  const userStore = useUserStore();
  const chatStore = useChatStore();

  const location = useLocation();

  const nickname = location.pathname?.split('/')[1] || '';
  const chatRoomId = location.pathname?.split('/')[3] || '';

  useEffect(() => {
    userStore.fetchUser(nickname);
    chatStore.fetchChats(chatRoomId);
  }, []);

  return ((
    <ChatRoom chatRoomId={chatRoomId} />
  ));
}
