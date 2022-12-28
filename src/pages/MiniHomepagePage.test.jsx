import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import MiniHomepagePage from './MiniHomepagePage';

const location = jest.fn();
const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation() {
    return location;
  },
  useNavigate() {
    return navigate;
  },
}));

test('MiniHomepagePage', () => {
  render((
    <ThemeProvider theme={theme}>
      <MiniHomepagePage />
    </ThemeProvider>));

  screen.getByText('사진첩');
  screen.getByText('방명록');
});
