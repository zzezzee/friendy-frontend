import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import PhotoEditFromPage from './PhotoEditFromPage';

const location = jest.fn();
const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation() {
    return location;
  },
  useNavigate() {
    return navigate;
  },
}));

test('PhotoRegistrationFormPage', () => {
  render((
    <ThemeProvider theme={theme}>
      <PhotoEditFromPage />
    </ThemeProvider>));
});
