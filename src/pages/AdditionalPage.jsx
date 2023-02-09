import { useEffect } from 'react';
import Notification from '../components/Notification';
import useUserStore from '../hooks/useUserStore';

export default function AdditionalPage() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  return ((
    <Notification />
  ));
}
