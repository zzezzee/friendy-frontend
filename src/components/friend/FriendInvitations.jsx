import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useFriendStore from '../../hooks/useFriendStore';

const Container = styled.div`

`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  object-fit: fill;
`;

export default function FriendInvitations({ menu, invitations }) {
  const friendStore = useFriendStore();

  const handleClickAccept = () => {

  };

  const handleClickRefuse = (id) => {
    friendStore.deleteInvitation(id, 'refuse');
  };

  const handleClickCancel = (id) => {
    friendStore.deleteInvitation(id, 'cancel');
  };

  return ((
    <Container>
      <ul>
        {invitations.map((invitation) => (
          <li key={invitation.id}>
            <Link to={`/${invitation.nickname}`}>
              <Image src={invitation.profileImage} alt="프로필이미지" />
              {invitation.nickname}
            </Link>
            {menu === 'received'
              ? (
                <div>
                  <button type="button" onClick={() => handleClickAccept(invitation.id)}>수락</button>
                  <button type="button" onClick={() => handleClickRefuse(invitation.id)}>거절</button>
                </div>
              )
              : null}
            {menu === 'sent'
              ? (
                <button type="button" onClick={() => handleClickCancel(invitation.id)}>취소</button>
              )
              : null}
          </li>
        ))}
      </ul>
      {menu === 'received' && invitations.length === 0
        ? <p>받은 일촌신청이 없습니다.</p>
        : null}
      {menu === 'sent' && invitations.length === 0
        ? <p>보낸 일촌신청이 없습니다.</p>
        : null}
    </Container>
  ));
}
