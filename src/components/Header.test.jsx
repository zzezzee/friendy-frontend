import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import Header from './Header';

test('Header', () => {
  render((
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>));
});
