import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useFriendStore from '../../hooks/useFriendStore';
import useProfileStore from '../../hooks/useProfileStore';
import useUserStore from '../../hooks/useUserStore';

const Title = styled.h1`
  font-weight: 700;
  font-size: 1em;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
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

  return ((
    <div>
      <div>
        <Title>
          {nickname}
          의 미니홈피
        </Title>
        {relationship === 'stranger'
          ? (
            <button type="button" onClick={handleClickSendInvitation}>
              일촌 신청
            </button>
          )
          : null }
      </div>
      <Image src={profileImage} alt="프로필사진" />
      <p>{introduction}</p>
      {relationship === 'me'
        ? <Link to="/change-profile">프로필 수정</Link>
        : null}
      <p>
      <Link to="friends">
        일촌:
        {' '}
        {friends
          ? friends.length
          : 0}
      </Link>
      </p>
      <p>즐겨찾기: 30</p>
    </div>
  ));
}
