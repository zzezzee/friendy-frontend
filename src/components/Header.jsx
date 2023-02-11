import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import { Chat, Logo, Notification } from '../assets/header';
import useNotificationStore from '../hooks/useNotificationStore';
import useMiniHomepageStore from '../hooks/useProfileStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;

  position: fixed;
  width: 390px;
  
  background-color: ${(({ theme }) => theme.colors.primary)};
`;

const Menu = styled.div`
  display: flex;
`;

const LogoWrapper = styled.h1`
  width: 100px;
  height: 19px;
`;

const IconWrapper = styled.h1`
  width: 40px;
  height: 19px;
`;

const HomeLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;

  background: url(${Logo}) no-repeat 0 50%;
  background-size: contain;

  text-indent: -10000px;
`;

const NotificationLink = styled(Link)`
  display: block;
  height: 100%;

  background: url(${Notification}) no-repeat 0 50%;
  background-size: contain;

  text-indent: -10000px;
`;

const ChatLink = styled(Link)`
  display: block;
  height: 100%;

  background: url(${Chat}) no-repeat 0 50%;
  background-size: contain;

  text-indent: -10000px;
`;

export default function Header() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();
  const miniHomepageStore = useMiniHomepageStore();
  const notificationStore = useNotificationStore();

  const { unCheckedNotifications } = notificationStore;

  const { nickname } = userStore;

  return ((
    <Container>
      <LogoWrapper>
        <HomeLink to="/">
          Friendy
        </HomeLink>
      </LogoWrapper>
      {accessToken
        ? (
          <Menu>
            <IconWrapper>
              <NotificationLink to={`/${nickname}/notifications`}>
                알림
              </NotificationLink>
            </IconWrapper>
            <div>
              {unCheckedNotifications.length}
            </div>
            <IconWrapper>
              <ChatLink to={`/${nickname}/chat-rooms`}> 채팅</ChatLink>
            </IconWrapper>
          </Menu>
        )
        : null}
    </Container>
  ));
}
