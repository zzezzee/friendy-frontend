import { useEffect } from 'react';
import Explore from '../components/explore/Explore';
import useUserStore from '../hooks/useUserStore';

export default function ExplorePage() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchUsers();
  }, []);

  return ((
    <Explore />
  ));
}
