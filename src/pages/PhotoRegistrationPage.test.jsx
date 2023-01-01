import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import PhotoRegistration from '../components/PhotoRegistration';
import theme from '../styles/Theme';

jest.mock('react-router-dom', () => ({
}));

test('PhotoRegistration', () => {
  render((
    <ThemeProvider theme={theme}>
      <PhotoRegistration />
    </ThemeProvider>));
});
