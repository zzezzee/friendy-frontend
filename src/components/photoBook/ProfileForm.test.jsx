import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import ProfileForm from './ProfileForm';

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

const changeIntroductionTestFunction = jest.fn();
const changeProfileImageTestFunction = jest.fn();

jest.mock('../../hooks/useProfileFormStore', () => () => ({
  profileImage: 'image_address',
  introduction: '미니홈피 소개',

  changeIntroduction: changeIntroductionTestFunction,
  changeProfileImage: changeProfileImageTestFunction,
}));

const context = describe;

describe('ProfileForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderProfileForm() {
    render((
      <ThemeProvider theme={theme}>
        <ProfileForm />
      </ThemeProvider>
    ));
  }

  context('when into ProfileForm', () => {
    it('render', () => {
      renderProfileForm();
    });
  });

  context('when change explanation', () => {
    it('changeExplanation to be called', async () => {
      renderProfileForm();

      fireEvent.change(screen.getByLabelText('미니홈피 소개'), {
        target: { value: '미니홈피 소개' },
      });

      await waitFor(() => {
        expect(changeIntroductionTestFunction).toBeCalledWith('미니홈피 소개');
      });
    });
  });
});
