import { useEffect } from 'react';
import Additional from '../components/Additional';
import useUserStore from '../hooks/useUserStore';

export default function AdditionalPage() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  return ((
    <Additional />
  ));
}
