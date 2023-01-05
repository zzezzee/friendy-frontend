import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import GuestBookDetail from './GuestBookDetail';

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

jest.mock('../../hooks/useGuestBookStore', () => () => ({
  guestBook:
    {
      id: 1,
      content: '방명록 내용1',
      profileImage: 'https://friendyimages.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A5%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B5.avif',
      writer: '허스키 주인1',
    },
}));

const context = describe;

describe('GuestBookDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderGuestBookDetail() {
    render((
      <ThemeProvider theme={theme}>
        <GuestBookDetail />
      </ThemeProvider>
    ));
  }

  context('when into GuestBookDetail', () => {
    it('render', () => {
      renderGuestBookDetail();
    });
  });

  context('when into GuestBookDetail', () => {
    it('see detail', () => {
      renderGuestBookDetail();

      screen.getByText('방명록 내용1');
    });
  });
});
