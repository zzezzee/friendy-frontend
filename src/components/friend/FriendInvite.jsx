import { useState } from 'react';
import styled from 'styled-components';
import useFriendStore from '../../hooks/useFriendStore';

const Container = styled.div`
  border: 1px solid brown;
  margin-bottom: 1em;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: .5em;

`;

const Button = styled.button`
  background-color: white;
  border: none;
  font-size: 1em;
  font-weight: 600;
  border-bottom:${(props) => (props.selected ? '3px solid purple' : 'none')};
`;

export default function FriendInvite() {
  const [menu, setMenu] = useState('received');

  const handleClickSeeReceived = () => {
    setMenu('received');
  };

  const handleClickSeeSent = () => {
    setMenu('sent');
  };

  return ((
    <Container>
      <Menu>
        <Button
          type="button"
          onClick={handleClickSeeReceived}
          selected={menu === 'received'}
        >
          받은 일촌 신청
        </Button>
        <Button
          type="button"
          onClick={handleClickSeeSent}
          selected={menu === 'sent'}
        >
          보낸 일촌 신청
        </Button>
      </Menu>
      {menu === 'received'
        ? <p>받은 일촌 신청</p>
        : <p>보낸 일촌 신청</p>}
    </Container>
  ));
}
