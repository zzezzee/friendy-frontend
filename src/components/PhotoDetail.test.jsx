import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import PhotoDetail from './PhotoDetail';

const navigate = jest.fn();
const location = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
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

const context = describe;

describe('PhotoDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderPhotoDetail() {
    render((
      <ThemeProvider theme={theme}>
        <PhotoDetail />
      </ThemeProvider>
    ));
  }

  context('when into PhotoDetail', () => {
    it('render', () => {
      renderPhotoDetail();
    });
  });

  context('when into PhotoDetail', () => {
    it('see Photo, explanation', () => {
      const photo = {
        id: 1,
        image: 'image_address',
        explanation: '사진 설명',
      };

      renderPhotoDetail();

      screen.getByText('사진 설명');
    });
  });
});
