import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import PhotoDetail from './PhotoDetail';

const navigate = jest.fn();

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
}));

const deletePhotoTestFunction = jest.fn();
const editPhotoTestFunction = jest.fn();

jest.mock('../../hooks/usePhotoBookStore', () => () => ({
  photo:
    {
      id: 1,
      image: 'image_address',
      explanation: '사진 설명',
    },

  deletePhoto: deletePhotoTestFunction,
  editPhoto: editPhotoTestFunction,
}));

const context = describe;

describe('PhotoDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderPhotoDetail() {
    render((
      <ThemeProvider theme={theme}>
        <PhotoDetail id={1} />
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
      renderPhotoDetail();

      screen.getByText('사진 설명');
    });
  });

  context('when delete photo', () => {
    it('go to previous page', async () => {
      renderPhotoDetail();

      fireEvent.click(screen.getByRole('button', { name: '삭제' }));

      await waitFor(() => {
        expect(deletePhotoTestFunction).toBeCalled();
        expect(navigate).toBeCalledWith(-1);
      });
    });
  });

  context('when edit photo', () => {
    it('go to editPhotoForm', async () => {
      renderPhotoDetail();

      fireEvent.click(screen.getByRole('button', { name: '수정' }));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/photo/edit/1');
      });
    });
  });
});
