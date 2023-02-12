import styled from 'styled-components';
import Header from '../components/Header';
import Navigator from '../components/Navigator';

const Container = styled.article`
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  width: 390px;

  background-color: ${(({ theme }) => theme.colors.background)};
`;

const Padding = styled.div`
  padding: 39px 0px 61px 0em;
`;

export default function Layout({ children, header, bottomNav }) {
  return (
    <Container>
      <Wrapper>
        {header && <Header />}
        <Padding>
          {children}
        </Padding>
        {bottomNav && <Navigator />}
      </Wrapper>
    </Container>
  );
}
