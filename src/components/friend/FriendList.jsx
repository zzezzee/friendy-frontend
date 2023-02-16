import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useFriendStore from '../../hooks/useFriendStore';

const Container = styled.div`
  padding: .5em;

  padding: 1em .5em;
  border-radius: 1em;
  background-color: white;

  p{
    text-align: center;
    font-size: .9em;
    font-weight: 600;
    border-bottom: 3px solid #FAD15B;
    padding: .5em;
    margin-bottom: 1em;
  }
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: .5em;
  object-fit: fill;
`;

export default function FriendList() {
  const { friends } = useFriendStore();

  return ((
    <Container>
      <p>일촌 목록</p>
      <ul>
        {friends
          ? friends.map((friend) => (
            <li key={friend.id}>
              <Link to={`/${friend.nickname}`}>
                <Image src={friend.profileImage} alt="일촌 이미지" />
                {friend.nickname}
              </Link>
            </li>
          ))
          : <p>일촌이 없습니다</p>}
      </ul>
    </Container>
  ));
}
