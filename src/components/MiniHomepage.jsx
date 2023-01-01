import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useMiniHomepageStore from '../hooks/useMiniHomepageStore';
import useUserStore from '../hooks/useUserStore';
import GuestBook from './GuestBook';
import PhotoBook from './PhotoBook';

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
  const miniHomepageStore = useMiniHomepageStore();

  const { nickname, profileImage, introduction } = miniHomepageStore;

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
        <p>일촌: 30</p>
        <p>즐겨찾기: 30</p>
      </Information>
      <PhotoBook nickname={nickname} />
      <GuestBook />
    </Container>
  ));
}
