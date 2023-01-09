import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import MiniHomepage from './MiniHomepage';

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

jest.mock('../hooks/usePhotoBookStore', () => () => ({
  photoBook: [
    {
      id: 1,
      image: 'image_address',
      explanation: '사진 설명',
    },
  ],
}));

jest.mock('../hooks/useGuestBookStore', () => () => ({
  guestBookList: [
    {
      id: 1,
      content: '방명록 내용1',
      profileImage: 'https://friendyimages.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A5%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B5.avif',
      nickname: '허스키 주인1',
    },
  ],
}));

jest.mock('../hooks/useProfileStore', () => () => ({
  nickname: 'zzezze',
  profileImage: 'image_address',
  introduction: '미니홈피 소개',
}));

const context = describe;

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderMiniHomepage() {
    render((
      <ThemeProvider theme={theme}>
        <MiniHomepage />
      </ThemeProvider>
    ));
  }

  context('when into My miniHomepage', () => {
    it('see nickname', () => {
      renderMiniHomepage();

      screen.getByText(/zzezze/);
    });

    it('see profileImage', () => {
      renderMiniHomepage();

      screen.getByAltText('프로필사진');
    });

    it('see introduction', () => {
      renderMiniHomepage();

      screen.getByText('미니홈피 소개');
    });
  });

  context('when click photoBook', () => {
    it('see photoBook', () => {
      renderMiniHomepage();

      fireEvent.click(screen.getByRole('button', { name: '사진첩' }));

      screen.getByAltText('사진1');
    });
  });

  context('when click guestBook', () => {
    it('see guestBook', () => {
      renderMiniHomepage();

      fireEvent.click(screen.getByRole('button', { name: '방명록' }));

      screen.getByText('방명록 내용1');
    });
  });
});
