import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useChatRoomStore from '../../hooks/useChatRoomStore';

const Container = styled.div`
  padding: 1em .5em;
  border-radius: 1em;
  margin-top: .5em;
  background-color: white;

  box-shadow: 1px 1px 1px 1px rgba(0, 0, 10, 0.3);

  h1{
    text-align: center;
    padding: .3em;;
    margin-bottom: .6em;
    font-weight: 600;
    border-bottom: 3px solid #FAD15B;
  }
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
  
  border-radius: 1em;
  margin-right: 1em;
  object-fit: fill;
`;

const Item = styled.li`
  display: flex;
  margin: .5em;
  padding: .3em;
  border-radius: 1em;
  box-shadow: inset .1px .1px 1px .5px rgba(0, 0, 10, 0.3);

  div{
    p:nth-child(1){
      font-size: 1.1em;
      font-weight: 600;
      margin-bottom: .3em;
    }
    p:nth-child(2){
      margin-bottom: .9em;
    }
    p:nth-child(3){
      font-size: .7em;
      font-weight: 400;
    }
  }
`;

export default function ChatRoomList() {
  const { chatRooms } = useChatRoomStore();

  return ((
    <Container>
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
    </Container>
  ));
}
