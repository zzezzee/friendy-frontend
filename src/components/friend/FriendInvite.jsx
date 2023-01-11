import { useState } from 'react';
import styled from 'styled-components';
import useFriendStore from '../../hooks/useFriendStore';
import FriendInvitations from './FriendInvitations';

const Container = styled.div`
  border: 3px solid brown;
  border-radius: 1em;
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

  const friendStore = useFriendStore();

  const { invitationsReceived, invitationsSent } = friendStore;

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
      <FriendInvitations
        menu={menu}
        invitations={
          menu === 'received'
            ? invitationsReceived
            : invitationsSent
        }
      />
    </Container>
  ));
}
