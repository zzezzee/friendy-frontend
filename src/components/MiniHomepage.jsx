import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';

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
  const userStore = useUserStore();

  const { nickname } = userStore;

  return ((
    <Container>
      <Information>
        <Title>
          {nickname}
          의 미니홈피
        </Title>
        <img src="" alt="프로필사진" />
        <p>미니홈피 소개</p>
        <button type="button">수정</button>
        <p>일촌 목록</p>
        <p>즐겨찾기 목록</p>
      </Information>
      <p>사진첩</p>
      <button type="button">추가</button>
      <p>방명록</p>
      <button type="button">추가</button>
    </Container>
  ));
}
