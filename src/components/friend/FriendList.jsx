import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useFriendStore from '../../hooks/useFriendStore';

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  object-fit: fill;
`;

export default function FriendList() {
  const { friends } = useFriendStore();

  return ((
    <div>
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
    </div>
  ));
}
