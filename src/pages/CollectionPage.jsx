import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Collection from '../components/collection/Collection';
import useUserStore from '../hooks/useUserStore';

export default function CollectionPage() {
  const userStore = useUserStore();

  const location = useLocation();

  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    userStore.fetchUser(nickname);
  }, []);

  return ((
    <Collection />
  ));
}
