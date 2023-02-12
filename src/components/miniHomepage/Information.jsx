import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useFriendStore from '../../hooks/useFriendStore';
import useProfileStore from '../../hooks/useProfileStore';
import useUserStore from '../../hooks/useUserStore';

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  padding: .6em;
  font-weight: 700;
  font-size: 1.1em;
`;

const Menu = styled.div`
  display: flex;
  font-size: .7em;

  justify-content: right;

  font-size: 13px;

  p{
    padding: 0em .4em;
    border-right: 1px solid gray;
  }

  p:nth-child(1){
    border-right: 1px solid gray;
    border-left: 1px solid gray;
  }
`;

const Profile = styled.div`
  display: grid;
  /* grid-template-rows:  */

  padding: 1em;

  border-radius: .5em;
  background-color: white;

  a{
    font-weight: 500;
  }

  box-shadow: 1px 1px 1px 1px rgba(0, 0, 10, 0.3);
`;

const Content = styled.div`
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    font-size: 1em;

    padding: 1em;

    a {
      font-size: .8em;
    }
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;

  border-radius: 1em;

  object-fit: fill;
`;
export default function Information({ relationship }) {
  const profileStore = useProfileStore();
  const friendStore = useFriendStore();
  const userStore = useUserStore();

  const { nickname, profileImage, introduction } = profileStore;
  const { friends } = friendStore;

  const handleClickSendInvitation = async () => {
    await friendStore.sendInvitation(nickname);
    await userStore.fetchUser(nickname);
  };

  const handleClickSendChat = async () => {
    // await friendStore.sendInvitation(nickname);
    // await userStore.fetchUser(nickname);
  };

  return ((
    <Container>
      <Title>
        {nickname}
        의 미니홈피
      </Title>
      <Profile>
        <Menu>
          {relationship === 'me'
            ? (
              <p>
                <Link to="/change-profile">프로필 수정</Link>
              </p>
            )
            : null}
          {relationship === 'stranger'
            ? (
              <p>
                <button type="button" onClick={handleClickSendInvitation}>
                  일촌 신청
                </button>
              </p>
            )
            : null}
          <p>
            <button type="button" onClick={handleClickSendChat}>
              채팅
            </button>
          </p>
        </Menu>
        <Content>
          <Image src={profileImage} alt="프로필사진" />
          <div>
            <p>{introduction}</p>
            <Link to="friends">
              일촌
              {' '}
              {friends
                ? friends.length
                : 0}
            </Link>
          </div>
        </Content>
      </Profile>
    </Container>
  ));
}
