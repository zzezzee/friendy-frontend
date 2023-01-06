import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import GuestBookRegistrationForm from './GuestBookRegistrationForm';

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

const createGuestBookTestFunction = jest.fn();

jest.mock('../../hooks/useGuestBookStore', () => () => ({
  createGuestBook: createGuestBookTestFunction,
}));

const changeContentTestFunction = jest.fn();

jest.mock('../../hooks/useGuestBookRegistrationFormStore', () => () => ({
  content: '방명록 내용',

  changeContent: changeContentTestFunction,
}));

const context = describe;

describe('GuestBookRegistrationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderGuestBookRegistrationForm() {
    render((
      <ThemeProvider theme={theme}>
        <GuestBookRegistrationForm />
      </ThemeProvider>
    ));
  }

  context('when into GuestBookRegistrationForm', () => {
    it('render', () => {
      renderGuestBookRegistrationForm();
    });
  });

  context('when change content', () => {
    it('changeContent to be called', async () => {
      renderGuestBookRegistrationForm();

      fireEvent.change(screen.getByLabelText('방명록 내용'), {
        target: { value: '방명록 내용이다.' },
      });

      await waitFor(() => {
        expect(changeContentTestFunction).toBeCalledWith('방명록 내용이다.');
      });
    });
  });

  context('when click 등록', () => {
    it('createGuestBook to be called', async () => {
      renderGuestBookRegistrationForm();

      fireEvent.change(screen.getByLabelText('방명록 내용'), {
        target: { value: '방명록 내용이다.' },
      });

      fireEvent.click(screen.getByRole('button', { name: '등록' }));

      await waitFor(() => {
        expect(createGuestBookTestFunction).toBeCalled();
      });
    });
  });
});
