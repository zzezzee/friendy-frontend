import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import PhotoDetailPage from './PhotoDetailPage';

const location = jest.fn();
const navigate = jest.fn();

jest.mock('../hooks/usePhotoBookStore', () => () => ({
  photos: [
    {
      id: 1,
      image: '1234',
      explanation: '사진설명',
    },
  ],
  photo:
    {
      id: 1,
      image: '1234',
      explanation: '사진설명',
    },
  fetchPhoto: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
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
  useLocation() {
    return location;
  },
}));

test('PhotoDetailPage', () => {
  render((
    <ThemeProvider theme={theme}>
      <PhotoDetailPage />
    </ThemeProvider>));
});
