import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import ChatRoom from './ChatRoom';

const context = describe;

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

jest.mock('../../hooks/useChatRoomStore', () => () => ({
  chatRooms: [
    {
      id: 1,
      profileImage: 'image_address',
      nickname: 'suktae',
    },
  ],
}));

describe('ChatRoom', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderChatRoomList() {
    render((
      <ThemeProvider theme={theme}>
        <ChatRoom />
      </ThemeProvider>
    ));
  }

  context('when into ChatRoom', () => {
    it('see ChatRoom', () => {
      renderChatRoomList();
    });
  });
});
