import styled from 'styled-components';
import useChatStore from '../../hooks/useChatStore';
import useUserStore from '../../hooks/useUserStore';

const Container = styled.div`
  height: 10%;
`;

export default function ChatInputForm() {
  const chatStore = useChatStore();
  const userStore = useUserStore();

  const { nickname } = userStore;

  const handleSubmit = (event) => {
    event.preventDefault();

    chatStore.sendChat(nickname);
  };

  const handleChangeMessageToSend = (event) => {
    chatStore.changeMessageToSend(event.target.value);
  };

  return ((
    <Container>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-chat">
          <input type="text" onChange={handleChangeMessageToSend} />
        </label>
        <button type="submit">전송</button>
      </form>
    </Container>
  ));
}
