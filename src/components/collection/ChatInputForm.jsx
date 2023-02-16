import { useState } from 'react';
import styled from 'styled-components';
import useChatStore from '../../hooks/useChatStore';
import useUserStore from '../../hooks/useUserStore';

const Container = styled.div`
  height: 10%;

  padding-bottom: 3em;
`;

const InputCommentBox = styled.div`
  display: flex;
  position: fixed;

  padding: .5em;
  width: 390px;

  background-color: #0C6F6A;

  bottom: 64px;

  input{
    width: 330px;
    padding: .5em;
    border-radius: 1em;
  }

  button:last-child{
    padding-left: .6em
  }
`;

export default function ChatInputForm({ scrollToBottom }) {
  const chatStore = useChatStore();
  const userStore = useUserStore();

  const { nickname } = userStore;
  const { messageToSend } = chatStore;

  const handleSubmit = (event) => {
    event.preventDefault();

    chatStore.sendChat(nickname);

    chatStore.reset();
    scrollToBottom();
  };

  const handleChangeMessageToSend = (event) => {
    chatStore.changeMessageToSend(event.target.value);
  };

  return ((
    <Container>
      <form onSubmit={handleSubmit}>
        <InputCommentBox>
          <label htmlFor="input-chat">
            <input
              type="text"
              onChange={handleChangeMessageToSend}
              value={messageToSend}
            />
          </label>
          <button type="submit">전송</button>
        </InputCommentBox>
      </form>
    </Container>
  ));
}
