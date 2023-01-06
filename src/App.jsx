import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { useLocalStorage } from 'usehooks-ts';
import Header from './components/Header';
import Navigator from './components/Navigator';
import AdditionalPage from './pages/AdditionalPage';
import ExplorePage from './pages/ExplorePage';
import GuestBookDetailPage from './pages/GuestBookDetailPage';
import GuestBookRegistrationFromPage from './pages/GuestBookRegistrationFromPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MiniHomepagePage from './pages/MiniHomepagePage';
import PhotoDetailPage from './pages/PhotoDetailPage';
import PhotoEditFromPage from './pages/PhotoEditFromPage';
import PhotoRegistrationFormPage from './pages/PhotoRegistrationFromPage';
import ProfileChangePage from './pages/ProfileChangePage';
import { guestBookApiService } from './services/GuestBookApiService';
import { miniHomepageApiService } from './services/MiniHomepageApiService';
import { photoBookApiService } from './services/PhotoBookApiService';
import { userApiService } from './services/UserApiService';
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
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    userApiService.setAccessToken(accessToken);
    photoBookApiService.setAccessToken(accessToken);
    guestBookApiService.setAccessToken(accessToken);
    miniHomepageApiService.setAccessToken(accessToken);
  }, [accessToken]);

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
            <Route path="/photos/write" element={<PhotoRegistrationFormPage />} />
            <Route path="/photo/edit/:id" element={<PhotoEditFromPage />} />
            <Route path="/change-profile" element={<ProfileChangePage />} />
            <Route path="/:nickname/photos/:id" element={<PhotoDetailPage />} />
            <Route path="/:nickname/guest-books/:id" element={<GuestBookDetailPage />} />
            <Route path="/guest-books/write" element={<GuestBookRegistrationFromPage />} />
          </Routes>
          <div>
            <Navigator />
          </div>
        </Main>
      </ThemeProvider>
    </div>
  ));
}
