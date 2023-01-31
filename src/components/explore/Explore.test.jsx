import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import Explore from './Explore';

const context = describe;

jest.mock('../../hooks/useUserStore', () => () => ({
  searching: false,
  users: [
    {
      id: 1,
      profileImage: 'image_address',
      nickname: 'suktae',
    },
  ],
}));

describe('Explore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderExplore() {
    render((
      <ThemeProvider theme={theme}>
        <Explore />
      </ThemeProvider>
    ));
  }

  context('when into explore', () => {
    it('see users', () => {
      // renderExplore();

      // screen.getByText('suktae');
    });
  });
});
