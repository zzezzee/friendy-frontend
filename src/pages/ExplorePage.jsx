import { useEffect } from 'react';
import Explore from '../components/Explore';
import useUserStore from '../hooks/useUserStore';

export default function ExplorePage() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  return ((
    <Explore />
  ));
}
