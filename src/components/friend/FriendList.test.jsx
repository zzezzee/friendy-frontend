import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import FriendList from './FriendList';

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

jest.mock('../../hooks/useFriendStore', () => () => ({
  friends: [
    {
      id: 1,
      nickname: 'zzezze',
      profileImage: 'image_address',
    },
  ],
}));

const context = describe;

describe('FriendList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderInformation() {
    render((
      <ThemeProvider theme={theme}>
        <FriendList />
      </ThemeProvider>
    ));
  }

  context('when into friendList', () => {
    it('see friendList', () => {
      renderInformation();

      screen.getByText('zzezze');
    });
  });

  context('when click friend', () => {
    it('go to friend miniHomepage', () => {
      renderInformation();

      expect(screen.getByText('zzezze').closest('a')).toHaveAttribute('href', '/zzezze');
    });
  });
});
