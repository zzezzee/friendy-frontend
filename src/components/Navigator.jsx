import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 15em;
`;

const Title = styled.h1`

`;

const List = styled.ul`
  display: flex;
  flex-direction: row;

  li {
    margin-right: 2em;
  }
`;

export default function Navigator() {
  const userStore = useUserStore();

  const { nickname } = userStore;

  return ((
    <Container>
      <List>
        <li>
          <Link to="/">
            홈
          </Link>
        </li>
        <li>
          <Link to={`/${nickname}`}>
            미니홈피
          </Link>
        </li>
        <li>
          <Link to="/explore">
            탐색
          </Link>
        </li>
        <li>
          <Link to="/additional">
            더보기
          </Link>
        </li>
      </List>
    </Container>
  ));
}
