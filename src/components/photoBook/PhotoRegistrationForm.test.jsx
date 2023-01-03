import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import PhotoRegistrationForm from './PhotoRegistrationForm';

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

const createPhotoTestFunction = jest.fn();

jest.mock('../../hooks/usePhotoBookStore', () => () => ({
  createPhoto: createPhotoTestFunction,
}));

const changeImageTestFunction = jest.fn();
const changeExplanationTestFunction = jest.fn();

jest.mock('../../hooks/usePhotoRegistrationFormStore', () => () => ({
  image: 'image_address',
  explanation: '이미지 설명',

  changeImage: changeImageTestFunction,
  changeExplanation: changeExplanationTestFunction,
}));

const context = describe;

describe('PhotoRegistrationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderPhotoRegistrationForm() {
    render((
      <ThemeProvider theme={theme}>
        <PhotoRegistrationForm />
      </ThemeProvider>
    ));
  }

  context('when into PhotoRegistrationForm', () => {
    it('render', () => {
      renderPhotoRegistrationForm();
    });
  });

  context('when upload image', () => {
    it('changeImage to be called', async () => {
      renderPhotoRegistrationForm();
      // // 파일 업로드 테스트 추후에 추가
      // const someValues = [{ name: 'teresa teng' }];
      // const str = JSON.stringify(someValues);
      // const blob = new Blob([str]);
      // const file = new File([blob], 'values.json', {
      //   type: 'image/*',
      // });
      // File.prototype.text = jest.fn().mockResolvedValueOnce(str);

      // const input = screen.getByTestId('file-input');

      // user.upload(input, file);

      // await waitFor(() => {
      //   expect(changeImageTestFunction).toBeCalled();
      // });
    });
  });

  context('when change explanation', () => {
    it('changeExplanation to be called', async () => {
      renderPhotoRegistrationForm();

      fireEvent.change(screen.getByLabelText('사진 설명'), {
        target: { value: '사진 설명입니다' },
      });

      await waitFor(() => {
        expect(changeExplanationTestFunction).toBeCalledWith('사진 설명입니다');
      });
    });
  });

  context('when click 등록', () => {
    it('createPhoto to be called', async () => {
    //   renderPhotoRegistrationForm();

      //   fireEvent.change(screen.getByLabelText('사진 설명'), {
      //     target: { value: '사진 설명입니다' },
      //   });

      //   fireEvent.change(screen.getByRole('button', { name: '등록' }));

    //   await waitFor(() => {
    //     expect(createPhotoTestFunction).toBeCalled();
    //   });
    });
  });
});
