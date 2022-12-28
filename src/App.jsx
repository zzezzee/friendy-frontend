import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import Header from './components/Header';
import Navigator from './components/Navigator';
import useUserStore from './hooks/useUserStore';
import AdditionalPage from './pages/AdditionalPage';
import ExplorePage from './pages/ExplorePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MiniHomepagePage from './pages/MiniHomepagePage';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/Theme';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  height: calc(100vh);
  min-height: 50em;
  margin: 0 auto;
  border: 1px solid black;

  div {
    
  }
`;

export default function App() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  return ((
    <div>
      <ThemeProvider theme={theme}>
        <Reset />
        <GlobalStyle />
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:nickname" element={<MiniHomepagePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/additional" element={<AdditionalPage />} />
          </Routes>
          <div>
            <Navigator />
          </div>
        </Main>
      </ThemeProvider>
    </div>
  ));
}
