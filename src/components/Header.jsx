import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useNotificationStore from '../hooks/useNotificationStore';
import useMiniHomepageStore from '../hooks/useProfileStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
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
  const notificationStore = useNotificationStore();

  const { unCheckedNotifications } = notificationStore;

  const { nickname } = userStore;

  const handleLogout = () => {
    setAccessToken('');
    userStore.reset();
    miniHomepageStore.reset();
    navigate('/');
  };

  return ((
    <Container>
      <Title>friendy</Title>
      {accessToken
        ? (
          <div>
            <Link to={`/${nickname}/notifications`}>
              알림
              {' '}
              {unCheckedNotifications.length}
            </Link>

            <Link to={`/${nickname}/chat-rooms`}> 채팅</Link>
          </div>
        )
        : null}
      <button type="button" onClick={handleLogout}>로그아웃</button>
    </Container>
  ));
}
