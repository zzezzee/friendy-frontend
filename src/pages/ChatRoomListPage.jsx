import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatRoom from '../components/collection/ChatRoomList';
import useUserStore from '../hooks/useUserStore';
import { chatRoomStore } from '../stores/ChatRoomStore';

export default function ChatRoomListPage() {
  const userStore = useUserStore();

  const location = useLocation();

  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    userStore.fetchUser(nickname);
    chatRoomStore.fetchChatRooms();
  }, []);

  return ((
    <ChatRoom />
  ));
}
