import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
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
});
