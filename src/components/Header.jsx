import styled from 'styled-components';

const Container = styled.div`
  font-weight: 700;
  width: 100%;
  height: 4em;
  border-bottom: 1px solid #D9D9D9;
`;

const Title = styled.h1`
  font-size: 2em;
  padding: 1em;
`;

export default function Header() {
  return ((
    <Container>
      <Title>friendy</Title>
    </Container>
  ));
}
