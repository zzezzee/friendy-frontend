import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import MiniHomepage from './MiniHomepage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderMiniHomepage() {
    render((
      <ThemeProvider theme={theme}>
        <MiniHomepage />
      </ThemeProvider>
    ));
  }

  context('when into My miniHomepage', () => {
    it('see introduction', () => {
      renderMiniHomepage();
    });
  });
});
