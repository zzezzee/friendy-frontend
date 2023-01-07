import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import ProfileChangePage from './ProfileChangePage';

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

test('ProfileChangePage', () => {
  render((
    <ThemeProvider theme={theme}>
      <ProfileChangePage />
    </ThemeProvider>));
});
