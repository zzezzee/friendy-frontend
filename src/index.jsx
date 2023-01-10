import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { friendApiService } from './services/FriendApiService';
import { guestBookApiService } from './services/GuestBookApiService';
import { photoBookApiService } from './services/PhotoBookApiService';
import { userApiService } from './services/UserApiService';

const data = localStorage.getItem('accessToken');
const accessToken = JSON.parse(data);

userApiService.setAccessToken(accessToken);
photoBookApiService.setAccessToken(accessToken);
guestBookApiService.setAccessToken(accessToken);
friendApiService.setAccessToken(accessToken);

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
