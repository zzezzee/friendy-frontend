import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Explore from '../components/explore/Explore';
import useUserStore from '../hooks/useUserStore';

export default function ExplorePage() {
  const userStore = useUserStore();

  const location = useLocation();

  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    userStore.fetchUser(nickname);
    userStore.fetchUsers();
  }, []);

  return ((
    <Explore />
  ));
}
