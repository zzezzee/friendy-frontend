import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useNotificationStore from '../hooks/useNotificationStore';
import useUserStore from '../hooks/useUserStore';
import dateFormat from '../utils/dateFormat';

const Container = styled.div`
  height: 100%;

`;

const Menu = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  height: 30px;


  button {
    border: 1px solid gray;
    border-radius: .5em;
  }
`;

const Item = styled.li`
  background-color: white;
  border-radius: 1em;
  margin-bottom: .2em;

  padding: .5em;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 10, 0.3);
`;

const StyledLink = styled(Link)`
  display: flex;

  div {
    display: flex;
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 60px;
  height: 60px;

  border-radius: 1em;


  object-fit: fill;
`;

export default function Notification() {
  const notificationStore = useNotificationStore();
  const userStore = useUserStore();

  const { notifications, unCheckedNotifications } = notificationStore;

  const { nickname } = userStore;

  const handleClickCheck = async (id) => {
    await notificationStore.check(id);
  };

  const handleClickCheckAll = async () => {
    await notificationStore.checkAll();
  };

  const handleClickDeleteChecked = async () => {
    await notificationStore.deleteAllChecked();
  };

  const handleClickDelete = async (id) => {
    await notificationStore.delete(id);
  };

  const handleClickDeleteAll = async () => {
    await notificationStore.deleteAll();
  };

  return ((
    <Container>
      <Menu>
        <button type="button" onClick={handleClickCheckAll}>모두 읽음으로 표시</button>
        <button type="button" onClick={handleClickDeleteChecked}>확인한 알림 삭제</button>
        <button type="button" onClick={handleClickDeleteAll}>모두 삭제</button>
      </Menu>
      <ul>
        {notifications.map((notification) => (
          <div key={notification.id}>
            <Item>
              {notification.type === 'photoComment'
                ? (
                  <StyledLink
                    to={`/${nickname}/photos/${notification.photoId}`}
                    onClick={() => handleClickCheck(notification.id)}
                  >
                    <Image src={notification.image} alt="게시물 이미지" />
                    <div>
                      <p>
                        {notification.nickname}
                        님이 사진에 댓글을 남겼습니다
                      </p>
                      <p>{notification.content}</p>
                    </div>
                  </StyledLink>
                )
                : null}
              {notification.type === 'GuestBookComment'
                ? (
                  <StyledLink
                    to={`/${nickname}/guest-books/${notification.photoId}`}
                    onClick={() => handleClickCheck(notification.id)}
                  >
                    <Image src={notification.image} alt="게시물 이미지" />
                    <p>
                      {notification.nickname}
                      님이 방명록을 남겼습니다
                      {' '}
                    </p>
                  </StyledLink>
                )
                : null}
              {notification.type === 'Like'
                ? (
                  <StyledLink
                    to={`/${nickname}/photos/${notification.photoId}`}
                    onClick={() => handleClickCheck(notification.id)}
                  >
                    <Image src={notification.image} alt="게시물 이미지" />
                    <p>
                      {notification.nickname}
                      님이 게시물에 좋아요를 남겼습니다.
                    </p>
                  </StyledLink>
                )
                : null}
              {notification.type === 'SendInvitation'
                ? (
                  <Link
                    to={`/${nickname}/friends`}
                    onClick={() => handleClickCheck(notification.id)}
                  >
                    <Image src={notification.profileImage} alt="프로필 이미지" />
                    <p>
                      {notification.nickname}
                      님이 일촌신청을 보냈습니다.
                    </p>
                  </Link>
                )
                : null}
              {notification.type === 'AcceptInvitation'
                ? (
                  <Link
                    to={`/${nickname}/friends`}
                    onClick={() => handleClickCheck(notification.id)}
                  >
                    <Image src={notification.profileImage} alt="프로필 이미지" />
                    <p>
                      {notification.nickname}
                      님과 일촌이 되었습니다.
                    </p>
                  </Link>
                )
                : null}
              <p>{dateFormat(notification.createdAt)}</p>
              <button type="button" onClick={() => handleClickDelete(notification.id)}>X</button>
            </Item>
          </div>
        ))}
      </ul>
    </Container>
  ));
}
