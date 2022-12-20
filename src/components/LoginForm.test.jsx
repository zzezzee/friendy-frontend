import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import LoginForm from './LoginForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderLoginForm(location) {
    render((
      <ThemeProvider theme={theme}>
        <LoginForm location={location} />
      </ThemeProvider>
    ));
  }

  context('when login With correct input', () => {
    it('navigate to mini-homepage', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'jaewon1234' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Password123!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        expect(navigate).toBeCalled();
      });
    });
  });

  context('when login With blank username', () => {
    it('show error message', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Password123!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('아이디를 입력해주세요');
      });
    });
  });

  context('when login With blank password', () => {
    it('show error message', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'jaewon1234' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('비밀번호를 입력해주세요');
      });
    });
  });

  context('when login With blank username and password', () => {
    it('show error message', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('아이디와 비밀번호를 입력해주세요');
      });
    });
  });
});
