import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
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

const deleteTest = jest.fn();

jest.mock('../../hooks/useFriendStore', () => () => ({
  deleteInvitation: deleteTest,
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

  context('when invitationSent cancel', () => {
    it('don\'t see invitation', async () => {
      const menu = 'sent';
      const invitations = [
        {
          id: 1,
          profileImage: 'image_address',
          nickname: 'user1',
        },
      ];

      renderFriendApplicationManager(menu, invitations);

      fireEvent.click(screen.getByRole('button', { name: '취소' }));

      await waitFor(() => {
        expect(deleteTest).toBeCalledWith(1, 'cancel');
      });
    });
  });

  context('when invitationReceived refuse', () => {
    it('don\'t see invitation', async () => {
      const menu = 'received';
      const invitations = [
        {
          id: 1,
          profileImage: 'image_address',
          nickname: 'user1',
        },
      ];

      renderFriendApplicationManager(menu, invitations);

      fireEvent.click(screen.getByRole('button', { name: '거절' }));

      await waitFor(() => {
        expect(deleteTest).toBeCalledWith(1, 'refuse');
      });
    });
  });

  context('when invitationReceived accept', () => {
    it('don\'t see invitation', async () => {
      const menu = 'received';
      const invitations = [
        {
          id: 1,
          profileImage: 'image_address',
          nickname: 'user1',
        },
      ];

      renderFriendApplicationManager(menu, invitations);

      fireEvent.click(screen.getByRole('button', { name: '수락' }));

      await waitFor(() => {
        expect(deleteTest).toBeCalledWith(1, 'accept');
      });
    });
  });
});
