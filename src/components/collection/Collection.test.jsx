import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import Collection from './Collection';

const context = describe;

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

describe('Collection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderCollection() {
    render((
      <ThemeProvider theme={theme}>
        <Collection />
      </ThemeProvider>
    ));
  }

  context('when into 모아보기', () => {
    it('see menu', () => {
      renderCollection();

      screen.getByText('채팅');
    });
  });
});
