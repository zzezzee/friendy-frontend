import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import Header from './Header';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
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

test('Header', () => {
  render((
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>));
});
