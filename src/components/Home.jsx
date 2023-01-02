import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';

export default function Home() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const [accessToken] = useLocalStorage('accessToken', '');

  const { nickname } = userStore;

  useEffect(() => {
    if (accessToken) {
      navigate(`/${nickname}`);
    }
  });

  console.log('Home');
  return ((
    <div>
      <p>Home</p>
      <Link to="/login">로그인</Link>
    </div>
  ));
}
