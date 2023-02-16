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
  grid-gap: .21em;
  grid-template-columns: repeat(3, 1fr);
  background-color: white;
  height: 30px;


  button {
    box-shadow: .1px .1px .1px .3px rgba(0, 0, 0.3, 0.3);
    border-radius: .5em;
  }
`;

const Item = styled.li`
  background-color:${(props) => (props.checked ? '#dcdcdc' : 'white')};
  border-radius: 1em;
  margin-bottom: .2em;

  padding: .5em;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 10, 0.3);
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;

  button{
    align-self: flex-start;
    font-weight: 300;
    font-size: .7em;
  }
`;

const Image = styled.img`
  width: 60px;
  height: 60px;

  border-radius: 1em;

  object-fit: fill;
`;

const Content = styled.div`
  display: flex;
  color:${(props) => (props.checked ? 'gray' : 'black')};

  div {
    justify-content: space-between;
    flex-direction: column;
    margin-top: .3em;
    margin-left: .3em;

    p:first-child{
      font-size: .8em;
      font-weight: 500;
      margin-bottom: 1em;
    }
    p:nth-child(2){
      font-size: .9em;
      margin-bottom: 1em;
    }
    p:last-child{
      font-size: .6em;
    }
  }
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
            <Item checked={notification.checked === true}>
              {notification.type === 'photoComment'
                ? (
                  <StyledLink
                    to={`/${nickname}/photos/${notification.photoId}`}
                    onClick={() => handleClickCheck(notification.id)}
                  >
                    <Content checked={notification.checked === true}>
                      <Image src={notification.image} alt="게시물 이미지" />
                      <div>
                        <p>
                          {notification.nickname}
                          님이 사진에 댓글을 남겼습니다
                        </p>
                        <p>{notification.content}</p>
                        <p>{dateFormat(notification.createdAt)}</p>
                      </div>
                    </Content>
                    <button type="button" onClick={() => handleClickDelete(notification.id)}>X</button>
                  </StyledLink>
                )
                : null}
              {notification.type === 'GuestBookComment'
                ? (
                  <StyledLink
                    to={`/${nickname}/guest-books/${notification.photoId}`}
                    onClick={() => handleClickCheck(notification.id)}
                  >
                    <Content checked={notification.checked === true}>
                      <Image src={notification.image} alt="게시물 이미지" />
                      <div>
                        <p>
                          {notification.nickname}
                          님이 방명록을 남겼습니다
                          {' '}
                        </p>
                        <p>{dateFormat(notification.createdAt)}</p>
                      </div>
                    </Content>
                    <button type="button" onClick={() => handleClickDelete(notification.id)}>X</button>
                  </StyledLink>
                )
                : null}
              {notification.type === 'Like'
                ? (
                  <StyledLink
                    to={`/${nickname}/photos/${notification.photoId}`}
                    onClick={() => handleClickCheck(notification.id)}
                  >
                    <Content checked={notification.checked === true}>
                      <Image src={notification.image} alt="게시물 이미지" />
                      <div>
                        <p>
                          {notification.nickname}
                          님이 게시물에 좋아요를 남겼습니다.
                        </p>
                        <p>{dateFormat(notification.createdAt)}</p>
                      </div>
                    </Content>
                    <button type="button" onClick={() => handleClickDelete(notification.id)}>X</button>
                  </StyledLink>
                )
                : null}
              {notification.type === 'SendInvitation'
                ? (
                  <StyledLink
                    to={`/${nickname}/friends`}
                    onClick={() => handleClickCheck(notification.id)}
                  >
                    <Content checked={notification.checked === true}>
                      <Image src={notification.profileImage} alt="프로필 이미지" />
                      <div>
                        <p>
                          {notification.nickname}
                          님이 일촌신청을 보냈습니다.
                        </p>
                        <p>{dateFormat(notification.createdAt)}</p>
                      </div>
                    </Content>
                    <button type="button" onClick={() => handleClickDelete(notification.id)}>X</button>
                  </StyledLink>
                )
                : null}
              {notification.type === 'AcceptInvitation'
                ? (
                  <StyledLink
                    to={`/${nickname}/friends`}
                    onClick={() => handleClickCheck(notification.id)}
                  >
                    <Content checked={notification.checked === true}>
                      <Image src={notification.profileImage} alt="프로필 이미지" />
                      <div>
                        <p>
                          {notification.nickname}
                          님과 일촌이 되었습니다.
                        </p>
                        <p>{dateFormat(notification.createdAt)}</p>
                      </div>
                    </Content>
                    <button type="button" onClick={() => handleClickDelete(notification.id)}>X</button>
                  </StyledLink>
                )
                : null}
            </Item>
          </div>
        ))}
      </ul>
    </Container>
  ));
}
