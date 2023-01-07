import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useProfileStore from '../hooks/useProfileStore';
import GuestBook from './guestBook/GuestBook';
import PhotoBook from './photoBook/PhotoBook';

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.5em;
`;

const Information = styled.header`
  border-bottom: 1px solid black;
  padding: 1em;
`;

export default function MiniHomepage() {
  const profileStore = useProfileStore();

  const { nickname, profileImage, introduction } = profileStore;

  return ((
    <Container>
      <Information>
        <Title>
          {nickname}
          의 미니홈피
        </Title>
        <img src={profileImage} alt="프로필사진" height="150px" />
        <p>{introduction}</p>
        <Link to="/change-profile">수정</Link>
        <p />
        <p>일촌: 30</p>
        <p>즐겨찾기: 30</p>
      </Information>
      <PhotoBook />
      <GuestBook />
    </Container>
  ));
}
