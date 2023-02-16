import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
`;

const StyledLink = styled(Link)`
  display: flex;

  div{
    p:nth-child(1){
      margin-top: .4em;
      font-weight: 500;
      margin-bottom: 1em;
    }
    p:nth-child(2){
      font-size: 0.8em;
      font-weight: 400;
    }
  }
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
  
  border-radius: 1em;
  margin-right: 1em;
  object-fit: fill;
`;

export default function User({ user }) {
  return ((
    <Container>
      <StyledLink to={`/${user.nickname}`}>
        <Image
          src={user.profileImage}
          alt={`유저${user.id}`}
        />
        <div>
          <p>
            {user.nickname}
          </p>
          <p>
            함께아는친구:
            {user.friendsTogether.length || 0}
            명
          </p>
        </div>
      </StyledLink>
    </Container>
  ));
}
