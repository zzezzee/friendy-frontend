import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import FriendsPhoto from './Collection';

const context = describe;

describe('FriendsPhoto', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderFriendsPhoto() {
    render((
      <ThemeProvider theme={theme}>
        <FriendsPhoto />
      </ThemeProvider>
    ));
  }

  context('when into 모아보기', () => {
    it('see friendPhoto', () => {
      // renderFriendsPhoto();
    });
  });
});
