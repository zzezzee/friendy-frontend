import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import Navigator from './Navigator';

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

describe('Navigator', () => {
  function renderNavigator() {
    render((
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>));
  }

  context('when login', () => {
    it('see navigator', async () => {
      renderNavigator();
    });
  });
});
