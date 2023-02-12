import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { useLocalStorage } from 'usehooks-ts';
import Header from './components/Header';
import Navigator from './components/Navigator';
import useNotificationStore from './hooks/useNotificationStore';
import AdditionalPage from './pages/AdditionalPage';
import ChatRoomListPage from './pages/ChatRoomListPage';
import ChatRoomPage from './pages/ChatRoomPage';
import CollectionPage from './pages/CollectionPage';
import ExplorePage from './pages/ExplorePage';
import FriendPage from './pages/FriendPage';
import GuestBookDetailPage from './pages/GuestBookDetailPage';
import GuestBookEditFromPage from './pages/GuestBookEditFromPage';
import GuestBookRegistrationFromPage from './pages/GuestBookRegistrationFromPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MiniHomepagePage from './pages/MiniHomepagePage';
import NotificationPage from './pages/NotificationPage';
import PhotoDetailPage from './pages/PhotoDetailPage';
import PhotoEditFromPage from './pages/PhotoEditFromPage';
import PhotoRegistrationFormPage from './pages/PhotoRegistrationFromPage';
import ProfileChangePage from './pages/ProfileChangePage';
import { chatApiService } from './services/ChatApiService';
import { chatRoomApiService } from './services/ChatRoomApiService';
import { commentApiService } from './services/CommentApiService';
import { friendApiService } from './services/FriendApiService';
import { guestBookApiService } from './services/GuestBookApiService';
import { notificationApiService } from './services/NotificationApiService';
import { photoBookApiService } from './services/PhotoBookApiService';
import { userApiService } from './services/UserApiService';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/Theme';

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const notificationStore = useNotificationStore();

  useEffect(() => {
    userApiService.setAccessToken(accessToken);
    photoBookApiService.setAccessToken(accessToken);
    guestBookApiService.setAccessToken(accessToken);
    friendApiService.setAccessToken(accessToken);
    commentApiService.setAccessToken(accessToken);
    chatRoomApiService.setAccessToken(accessToken);
    chatApiService.setAccessToken(accessToken);
    notificationApiService.setAccessToken(accessToken);

    if (accessToken) {
      notificationStore.connect(accessToken);
    }
  }, [accessToken]);

  return ((
    <div>
      <ThemeProvider theme={{ ...theme }}>
        <Reset />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:nickname" element={<MiniHomepagePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/:nickname/explore" element={<ExplorePage />} />
          <Route path="/:nickname/additional" element={<AdditionalPage />} />
          <Route path="/photos/write" element={<PhotoRegistrationFormPage />} />
          <Route path="/photo/edit/:id" element={<PhotoEditFromPage />} />
          <Route path="/change-profile" element={<ProfileChangePage />} />
          <Route path="/:nickname/photos/:id" element={<PhotoDetailPage />} />
          <Route path="/:nickname/guest-books/:id" element={<GuestBookDetailPage />} />
          <Route path="/:nickname/guest-books/write" element={<GuestBookRegistrationFromPage />} />
          <Route path="/guest-books/edit/:id" element={<GuestBookEditFromPage />} />
          <Route path="/:nickname/friends" element={<FriendPage />} />
          <Route path="/:nickname/collections" element={<CollectionPage />} />
          <Route path="/:nickname/chat-rooms" element={<ChatRoomListPage />} />
          <Route path="/:nickname/chat-rooms/:id" element={<ChatRoomPage />} />
          <Route path="/:nickname/notifications" element={<NotificationPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  ));
}
