import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useChatRoomStore from '../../hooks/useChatRoomStore';

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: fill;
`;

const Item = styled.li`
  display: flex;
  margin: .5em;

  border: 1px solid gray;
`;

export default function ChatRoomList() {
  const { chatRooms } = useChatRoomStore();

  return ((
    <div>
      <h1>채팅 목록</h1>
      <ul>
        {chatRooms.map((chatRoom) => (
          <Link to={`${chatRoom.id}`} key={chatRoom.id}>
            <Item>
              <Image src={chatRoom.profileImage} alt="프로필사진" />
              <div>
                <p>{chatRoom.nickname}</p>
                <p>{chatRoom.recentChat}</p>
                <p>{chatRoom.recentChatCreatedAt}</p>
              </div>
            </Item>
          </Link>
        ))}
      </ul>
    </div>
  ));
}
