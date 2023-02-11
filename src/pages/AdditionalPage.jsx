import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import Layout from '../layouts/Layout';

export default function AdditionalPage() {
  const userStore = useUserStore();
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return ((
    <Layout header bottomNav>
      <p>단장중</p>
      <button type="button" onClick={handleLogout}>로그아웃</button>
    </Layout>

  ));
}
