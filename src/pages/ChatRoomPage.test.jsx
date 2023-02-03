import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import ChatRoomPage from './ChatRoomPage';

const location = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useLocation() {
    return location;
  },
}));

jest.mock('../hooks/useChatStore', () => () => ({
  fetchChats: jest.fn(),
}));

jest.mock('../hooks/useUserStore', () => () => ({
  fetchUser: jest.fn(),
}));

test('ChatRoomPage', () => {
  render((
    <ThemeProvider theme={theme}>
      <ChatRoomPage />
    </ThemeProvider>));
});
