import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import FriendInvitations from './FriendInvitations';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useLocation() {
    return {
      pathname: {
        startsWith: jest.fn(),
      },
    };
  },
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('FriendInvitations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderFriendApplicationManager(menu, invitations) {
    render((
      <ThemeProvider theme={theme}>
        <FriendInvitations
          menu={menu}
          invitations={invitations}
        />
      </ThemeProvider>
    ));
  }

  context('when go into invitationsReceived menu', () => {
    it('see invitationsReceived', () => {
      const menu = 'received';
      const invitations = [
        {
          id: 1,
          profileImage: 'image_address',
          nickname: 'user1',
        },
      ];

      renderFriendApplicationManager(menu, invitations);

      screen.getByText('user1');
      screen.getByText('수락');
      screen.getByText('거절');
    });
  });

  context('when invitationsReceived not exist', () => {
    it('see invitationsReceived', () => {
      const menu = 'received';
      const invitations = [
      ];

      renderFriendApplicationManager(menu, invitations);

      screen.getByText('받은 일촌신청이 없습니다.');
    });
  });

  context('when go into invitationsSent menu', () => {
    it('see invitationsSent', () => {
      const menu = 'sent';
      const invitations = [
        {
          id: 1,
          profileImage: 'image_address',
          nickname: 'user2',
        },
      ];

      renderFriendApplicationManager(menu, invitations);

      screen.getByText('user2');
      screen.getByText('취소');
    });
  });

  context('when invitationsSent not exist', () => {
    it('see invitationsSent', () => {
      const menu = 'sent';
      const invitations = [
      ];

      renderFriendApplicationManager(menu, invitations);

      screen.getByText('보낸 일촌신청이 없습니다.');
    });
  });
});
