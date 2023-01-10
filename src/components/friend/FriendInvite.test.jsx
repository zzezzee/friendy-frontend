import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import FriendInvite from './FriendInvite';

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

describe('FriendInvite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderFriendApplicationManager() {
    render((
      <ThemeProvider theme={theme}>
        <FriendInvite />
      </ThemeProvider>
    ));
  }

  context('when into FriendInvite', () => {
    it('see FriendInvite', () => {
      renderFriendApplicationManager();

      screen.getByRole('button', { name: '보낸 일촌 신청' });
      screen.getByRole('button', { name: '받은 일촌 신청' });
    });
  });
});
