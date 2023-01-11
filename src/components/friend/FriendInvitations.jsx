import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`

`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  object-fit: fill;
`;

export default function FriendInvitations({ menu, invitations }) {
  const handleClickAccept = () => {

  };

  const handleClickRefuse = () => {

  };

  const handleClickCancel = () => {

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
                  <button type="button" onClick={handleClickAccept}>수락</button>
                  <button type="button" onClick={handleClickRefuse}>거절</button>
                </div>
              )
              : null}
            {menu === 'sent'
              ? (
                <button type="button" onClick={handleClickCancel}>취소</button>
              )
              : null}
          </li>
        ))}
      </ul>
      {menu === 'received' && invitations.length === 0
        ? <p> 받은 일촌신청이 없습니다.</p>
        : null}
      {menu === 'sent' && invitations.length === 0
        ? <p> 보낸 일촌신청이 없습니다.</p>
        : null}
    </Container>
  ));
}
