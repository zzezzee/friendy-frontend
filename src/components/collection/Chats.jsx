import styled from 'styled-components';
import useChatStore from '../../hooks/useChatStore';

const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: fill;
`;

const Item = styled.li`
  display: flex;
  padding: .5em;
`;

const Content = styled.p`
  padding: .5em;
  width: 80%;

  border: 1px solid gray;
  border-radius: 1em;
`;

export default function Chats() {
  const chatStore = useChatStore();

  const { chats } = chatStore;

  return ((
    <div>
      <ul>
        {chats.map((chat) => (
          <Item key={chat.id}>
            <Image src={chat.profileImage} alt="프로필이미지" />
            <Content>
              <p>{chat.nickname}</p>
              <p>{chat.content}</p>
              <p>
                {chat.createdAt}
              </p>
            </Content>
          </Item>
        ))}
      </ul>
    </div>
  ));
}
