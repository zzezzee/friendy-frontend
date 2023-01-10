import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import FriendListPage from './FriendListPage';

const navigate = jest.fn();
const location = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  useLocation() {
    return location;
  },
}));

test('FriendListPage', () => {
  // render((
  // <ThemeProvider theme={theme}>
  //   <FriendListPage />
  // </ThemeProvider>));
});
