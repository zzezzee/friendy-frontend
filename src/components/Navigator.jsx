import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1em;;
  height: 3em;
  background-color: white;
  border-top: 2px solid purple;
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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
          <a href={`/${nickname}`}>
            미니홈피
          </a>
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
