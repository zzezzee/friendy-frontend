import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import Information from './Information';

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

jest.mock('../../hooks/useProfileStore', () => () => ({
  nickname: 'zzezze',
  profileImage: 'image_address',
  introduction: '미니홈피 소개',
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

describe('Information', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderInformation() {
    render((
      <ThemeProvider theme={theme}>
        <Information />
      </ThemeProvider>
    ));
  }

  context('when into My miniHomepage', () => {
    it('see Information', () => {
      renderInformation();

      screen.getByText(/zzezze/);
      screen.getByText(/일촌/);
      screen.getByText(/즐겨찾기/);
    });

    it('see number of friends', () => {
      renderInformation();

      screen.getByText('일촌: 1');
    });
  });
});
