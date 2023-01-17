import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { useLocalStorage } from 'usehooks-ts';
import Header from './components/Header';
import Navigator from './components/Navigator';
import AdditionalPage from './pages/AdditionalPage';
import ExplorePage from './pages/ExplorePage';
import FriendPage from './pages/FriendPage';
import GuestBookDetailPage from './pages/GuestBookDetailPage';
import GuestBookEditFromPage from './pages/GuestBookEditFromPage';
import GuestBookRegistrationFromPage from './pages/GuestBookRegistrationFromPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MiniHomepagePage from './pages/MiniHomepagePage';
import PhotoDetailPage from './pages/PhotoDetailPage';
import PhotoEditFromPage from './pages/PhotoEditFromPage';
import PhotoRegistrationFormPage from './pages/PhotoRegistrationFromPage';
import ProfileChangePage from './pages/ProfileChangePage';
import { commentApiService } from './services/CommentApiService';
import { friendApiService } from './services/FriendApiService';
import { guestBookApiService } from './services/GuestBookApiService';
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
`;

const Footer = styled.footer`
    position: fixed;
    left: 0;
    right: 0;
    top: 50em;
    bottom: 0em;
    border-top: 1px solid black;
`;

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    userApiService.setAccessToken(accessToken);
    photoBookApiService.setAccessToken(accessToken);
    guestBookApiService.setAccessToken(accessToken);
    friendApiService.setAccessToken(accessToken);
    commentApiService.setAccessToken(accessToken);
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
            <Route path="/:nickname/explore" element={<ExplorePage />} />
            <Route path="/additional" element={<AdditionalPage />} />
            <Route path="/photos/write" element={<PhotoRegistrationFormPage />} />
            <Route path="/photo/edit/:id" element={<PhotoEditFromPage />} />
            <Route path="/change-profile" element={<ProfileChangePage />} />
            <Route path="/:nickname/photos/:id" element={<PhotoDetailPage />} />
            <Route path="/:nickname/guest-books/:id" element={<GuestBookDetailPage />} />
            <Route path="/:nickname/guest-books/write" element={<GuestBookRegistrationFromPage />} />
            <Route path="/guest-books/edit/:id" element={<GuestBookEditFromPage />} />
            <Route path="/:nickname/friends" element={<FriendPage />} />
          </Routes>
          <Footer>
            <Navigator />
          </Footer>
        </Main>
      </ThemeProvider>
    </div>
  ));
}
