import { useEffect } from 'react';
import MiniHomepage from '../components/MiniHomepage';
import useUserStore from '../hooks/useUserStore';

export default function MiniHomepagePage() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  return ((
    <MiniHomepage />
  ));
}
