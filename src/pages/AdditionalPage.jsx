import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import Additional from '../components/Additional';
import useUserStore from '../hooks/useUserStore';
import Layout from '../layouts/Layout';

export default function AdditionalPage() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  return ((
    <Layout header bottomNav>
      <Additional />
    </Layout>
  ));
}
