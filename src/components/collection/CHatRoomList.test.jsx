import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import ChatRoomList from './ChatRoomList';

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

describe('ChatRoomList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderChatRoomList() {
    render((
      <ThemeProvider theme={theme}>
        <ChatRoomList />
      </ThemeProvider>
    ));
  }

  context('when into 모아보기', () => {
    it('see menu', () => {
      renderChatRoomList();

      screen.getByText('suktae');
      screen.getByAltText('프로필사진');
    });
  });
});
