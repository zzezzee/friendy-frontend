import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import GuestBook from './GuestBook';

const context = describe;

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
});
