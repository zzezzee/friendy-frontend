import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useMiniHomepageStore from '../hooks/useProfileStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  width: 100%;
  height: 2em;
  border-bottom: 1px solid #D9D9D9;
`;

const Title = styled.h1`
  font-size: 1.5em;
  padding: .5em;
`;

export default function Header() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();
  const userStore = useUserStore();
  const miniHomepageStore = useMiniHomepageStore();

  const handleLogout = () => {
    setAccessToken('');
    userStore.reset();
    miniHomepageStore.reset();
    navigate('/');
  };

  return ((
    <Container>
      <Title>friendy</Title>
      <button type="button" onClick={handleLogout}>로그아웃</button>
    </Container>
  ));
}
