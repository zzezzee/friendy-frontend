import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { chatApiService } from './services/ChatApiService';
import { chatRoomApiService } from './services/ChatRoomApiService';
import { commentApiService } from './services/CommentApiService';
import { friendApiService } from './services/FriendApiService';
import { guestBookApiService } from './services/GuestBookApiService';
import { notificationApiService } from './services/NotificationApiService';
import { photoBookApiService } from './services/PhotoBookApiService';
import { userApiService } from './services/UserApiService';

const data = localStorage.getItem('accessToken');
const accessToken = JSON.parse(data);

userApiService.setAccessToken(accessToken);
photoBookApiService.setAccessToken(accessToken);
guestBookApiService.setAccessToken(accessToken);
friendApiService.setAccessToken(accessToken);
commentApiService.setAccessToken(accessToken);
chatRoomApiService.setAccessToken(accessToken);
chatApiService.setAccessToken(accessToken);
notificationApiService.setAccessToken(accessToken);

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
