import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import Additional from '../components/Additional';
import useUserStore from '../hooks/useUserStore';
import Layout from '../layouts/Layout';

export default function AdditionalPage() {
  const userStore = useUserStore();

  const location = useLocation();

  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    userStore.fetchUser(nickname);
  }, []);

  return ((
    <Layout header bottomNav>
      <Additional />
    </Layout>
  ));
}
