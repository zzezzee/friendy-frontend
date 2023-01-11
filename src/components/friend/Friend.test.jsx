import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import Friend from './Friend';

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

describe('Friend', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderFriend() {
    render((
      <ThemeProvider theme={theme}>
        <Friend />
      </ThemeProvider>
    ));
  }

  context('when into friend', () => {
    it('see friend', () => {
      renderFriend();
    });
  });
});
