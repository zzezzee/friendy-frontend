import { useState } from 'react';
import styled from 'styled-components';
import useFriendStore from '../../hooks/useFriendStore';
import FriendInvitations from './FriendInvitations';

const Container = styled.div`
  background-color: white;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 10, 0.3);

  border-radius: 1em;
  margin-bottom: 1em;
  width: 100%;

`;

const Menu = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: .5em;
  width: 100%;

`;

const ButtonBox = styled.button`
  width: 100%;
  text-align: center;

  padding: .5em;
  border-bottom:${(props) => (props.selected ? '3px solid #FAD15B' : 'none')};

  font-weight: 500;
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
        <ButtonBox
          type="button"
          onClick={handleClickSeeReceived}
          selected={menu === 'received'}
        >
          받은 일촌 신청
        </ButtonBox>
        <ButtonBox
          type="button"
          onClick={handleClickSeeSent}
          selected={menu === 'sent'}
        >
          보낸 일촌 신청
        </ButtonBox>
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
