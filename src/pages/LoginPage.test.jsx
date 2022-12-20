import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import LoginPage from './LoginPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

test('LoginPage', () => {
  render((
    <ThemeProvider theme={theme}>
      <LoginPage />
    </ThemeProvider>));

  screen.getByPlaceholderText('아이디');
  screen.getByPlaceholderText('아이디');
  screen.getByRole('button', { name: '로그인' });
  screen.getByText('회원가입');
});
