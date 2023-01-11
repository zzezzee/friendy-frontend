import { render, screen } from '@testing-library/react';
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

jest.mock('../hooks/useUserStore', () => () => ({
  nickname: 'zzezze',
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

      screen.getByText('홈');
      screen.getByText('미니홈피');
      screen.getByText('탐색');
      screen.getByText('더보기');
    });
  });

  context('when click 홈', () => {
    it('go to 홈', async () => {
      renderNavigator();

      expect(screen.getByText('홈').closest('a')).toHaveAttribute('href', '/');
    });
  });

  context('when click 미니홈피', () => {
    it('go to 미니홈피', async () => {
      renderNavigator();

      expect(screen.getByText('미니홈피').closest('a')).toHaveAttribute('href', '/zzezze');
    });
  });

  context('when click 탐색', () => {
    it('go to 탐색', async () => {
      renderNavigator();

      expect(screen.getByText('탐색').closest('a')).toHaveAttribute('href', '/zzezze/explore');
    });
  });

  context('when click 더보기', () => {
    it('go to 더보기', async () => {
      renderNavigator();

      expect(screen.getByText('더보기').closest('a')).toHaveAttribute('href', '/additional');
    });
  });
});
