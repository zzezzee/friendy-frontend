import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatRoomList from '../components/collection/ChatRoomList';
import useUserStore from '../hooks/useUserStore';
import Layout from '../layouts/Layout';
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
    <Layout header bottomNav>
      <ChatRoomList />
    </Layout>

  ));
}
