import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FriendList from '../components/friend/FriendList';
import useFriendStore from '../hooks/useFriendStore';
import useUserStore from '../hooks/useUserStore';

export default function FriendListPage() {
  const userStore = useUserStore();
  const friendStore = useFriendStore();

  const location = useLocation();

  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    userStore.fetchUser(nickname);
    friendStore.fetchFriends(nickname);
  }, []);

  return ((
    <FriendList />
  ));
}
