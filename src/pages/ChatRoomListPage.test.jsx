import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import ChatRoomListPage from './ChatRoomListPage';

const navigate = jest.fn();
const location = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  useLocation() {
    return location;
  },
}));

jest.mock('../hooks/useChatRoomStore', () => () => ({
  chatRooms: [],
  fetchChatRooms: jest.fn(),
}));

jest.mock('../hooks/useUserStore', () => () => ({
  fetchUser: jest.fn(),
}));

test('ChatRoomListPage', () => {
  render((
    <ThemeProvider theme={theme}>
      <ChatRoomListPage />
    </ThemeProvider>));
});
