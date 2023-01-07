import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import GuestBookEditForm from './GuestBookEditForm';

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

const editGuestBookTestFunction = jest.fn();

jest.mock('../../hooks/useGuestBookStore', () => () => ({
  editGuestBook: editGuestBookTestFunction,
}));

const changeContentTestFunction = jest.fn();

jest.mock('../../hooks/useGuestBookRegistrationFormStore', () => () => ({
  content: '방명록 내용',

  changeContent: changeContentTestFunction,
}));

const context = describe;

describe('GuestBookEditForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderGuestBookEditForm() {
    render((
      <ThemeProvider theme={theme}>
        <GuestBookEditForm />
      </ThemeProvider>
    ));
  }

  context('when into GuestBookEditForm', () => {
    it('render', () => {
      renderGuestBookEditForm();
    });
  });

  context('when change content', () => {
    it('changeContent to be called', async () => {
      renderGuestBookEditForm();

      fireEvent.change(screen.getByLabelText('방명록 내용 수정'), {
        target: { value: '방명록 내용이다.' },
      });

      await waitFor(() => {
        expect(changeContentTestFunction).toBeCalledWith('방명록 내용이다.');
      });
    });
  });

  context('when click 등록', () => {
    it('createGuestBook to be called', async () => {
      renderGuestBookEditForm();

      fireEvent.change(screen.getByLabelText('방명록 내용 수정'), {
        target: { value: '방명록 내용 수정이다.' },
      });

      fireEvent.click(screen.getByRole('button', { name: '등록' }));

      await waitFor(() => {
        expect(editGuestBookTestFunction).toBeCalled();
      });
    });
  });
});
