import styled from 'styled-components';
import useChatStore from '../../hooks/useChatStore';
import useUserStore from '../../hooks/useUserStore';

const Container = styled.div`
  padding: .3em;
  background-color: white;
  min-height: 695px;
  border-radius: 1em 1em 0 0;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 10, 0.3);
  padding-bottom: 65px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;

  border-radius: 1em;

  margin-right: .5em;
  object-fit: fill;
`;

const Item = styled.li`
  display: flex;
  padding: .5em;

  justify-content: ${(props) => (props.nickname ? '' : 'flex-end')};
`;

const OpponentChat = styled.div`
  display: flex;

  div{
  padding: .5em;
  width: 200px;
  box-shadow: inset .1px .1px .1px 1px rgba(0, 0, 10, 0.3);

  border-radius: 1em;

    p:nth-child(1){
      font-size: .8em;
      font-weight: 600;
      margin-bottom: .1em;
    }
    p:nth-child(2){
      margin-top: .5em;
    }
    p:nth-child(3){
      font-size: .4em;
      font-weight: 400;
      text-align: right;
    }
  }
`;

const MyChat = styled.div`
  display: flex;
  background-color: #fff2cc;
  border-radius: 1em;

  div{
    padding: .5em;
    width: 200px;
    box-shadow: inset .1px .1px .1px 1px rgba(0, 0, 10, 0.3);

    border-radius: 1em;

    p:nth-child(1){
      margin-top: .5em;
    }
    p:nth-child(2){
      font-size: .4em;
      font-weight: 400;
      text-align: right;
    }
  }
`;

export default function Chats({ messagesEndRef }) {
  const chatStore = useChatStore();
  const userStore = useUserStore();

  const { nickname } = userStore;
  const { chats } = chatStore;

  return ((
    <Container>
      <List>
        {chats.map((chat) => (
          <Item
            key={chat.id}
            nickname={chat.nickname !== nickname}
          >
            {chat.nickname !== nickname
              ? (
                <OpponentChat>
                  <Image src={chat.profileImage} alt="프로필이미지" />
                  <div>
                    <p>{chat.nickname}</p>
                    <p>{chat.content}</p>
                    <p>
                      {chat.createdAt}
                    </p>
                  </div>
                </OpponentChat>
              )
              : (
                <MyChat>
                  <div>
                    <p>{chat.content}</p>
                    <p>
                      {chat.createdAt}
                    </p>
                  </div>
                </MyChat>
              )}
          </Item>
        ))}
      </List>
      <div ref={messagesEndRef} />
    </Container>
  ));
}
