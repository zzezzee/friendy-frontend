import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import PhotoBook from './PhotoBook';

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

const context = describe;

jest.mock('../../hooks/usePhotoBookStore', () => () => ({
  photoBook: [
    {
      id: 1,
      image: 'image_address',
      explanation: '사진 설명',
    },
    {
      id: 2,
      image: 'image_address2',
      explanation: '사진 설명2',
    },
  ],
}));

describe('PhotoBook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderPhotoBook() {
    render((
      <ThemeProvider theme={theme}>
        <PhotoBook />
      </ThemeProvider>
    ));
  }

  context('when into My miniHomepage', () => {
    it('see photoBook', () => {
      renderPhotoBook();
    });
  });

  // context('when photo does not exist', () => {
  //   it('see 사진을 추가해 주세요', () => {
  //     renderPhotoBook();

  //     screen.getByText('사진을 추가해 주세요');
  //   });
  // });

  context('when photo exist', () => {
    it('see photo', () => {
      renderPhotoBook();

      screen.getByAltText('사진1');
      screen.getByAltText('사진2');
    });
  });
});
