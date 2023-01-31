import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import CollectionPage from './CollectionPage';

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

jest.mock('../hooks/useChatRoomStore', () => () => ({
  chatRooms: [],
  fetchChatRooms: jest.fn(),
}));

jest.mock('../hooks/useUserStore', () => () => ({
  fetchUser: jest.fn(),
}));

test('CollectionPage', () => {
  render((
    <ThemeProvider theme={theme}>
      <CollectionPage />
    </ThemeProvider>));
});
