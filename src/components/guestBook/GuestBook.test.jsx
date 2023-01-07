import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import GuestBook from './GuestBook';

const context = describe;

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

jest.mock('../../hooks/useGuestBookStore', () => () => ({
  guestBookList: [
    {
      id: 1,
      content: '방명록 내용1',
      profileImage: 'https://friendyimages.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A5%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B5.avif',
      nickname: '허스키 주인1',
    },
    {
      id: 2,
      content: '방명록 내용2',
      profileImage: 'https://friendyimages.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A5%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B5.avif',
      nickname: '허스키 주인2',
    },
  ],
}));

describe('GuestBook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderGuestBook() {
    render((
      <ThemeProvider theme={theme}>
        <GuestBook />
      </ThemeProvider>
    ));
  }

  context('when into My miniHomepage', () => {
    it('see GuestBook', () => {
      renderGuestBook();
    });
  });

  context('when guestBookList exist', () => {
    it('see GuestBook', () => {
      renderGuestBook();

      screen.getByText('허스키 주인1');
      screen.getByText('방명록 내용1');
    });
  });
});
