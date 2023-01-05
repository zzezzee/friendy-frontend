import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { guestBookApiService } from './services/GuestBookApiService';
import { miniHomepageApiService } from './services/MiniHomepageApiService';
import { photoBookApiService } from './services/PhotoBookApiService';
import { userApiService } from './services/UserApiService';

const data = localStorage.getItem('accessToken');
const accessToken = JSON.parse(data);

userApiService.setAccessToken(accessToken);
miniHomepageApiService.setAccessToken(accessToken);
photoBookApiService.setAccessToken(accessToken);
guestBookApiService.setAccessToken(accessToken);

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
