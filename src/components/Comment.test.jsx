import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import Comments from './Comment';

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

jest.mock('../hooks/useUserStore', () => () => ({
  nickname: 'zzezze',
}));

const changeContentTestFunction = jest.fn();

jest.mock('../hooks/useCommentFormStore', () => () => ({
  content: '댓글내용입니다',

  changeContent: changeContentTestFunction,
  changeReplyNickname: jest.fn(),
}));

const createCommentTestFunction = jest.fn();
const fetchPhotoTestFunction = jest.fn();

jest.mock('../hooks/usePhotoBookStore', () => () => ({
  createComment: createCommentTestFunction,
  fetchPhoto: fetchPhotoTestFunction,
}));

const context = describe;

describe('Comments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderComments(comments, id = 1) {
    render((
      <ThemeProvider theme={theme}>
        <Comments
          comments={comments}
          id={id}
        />
      </ThemeProvider>
    ));
  }

  context('when comments exist', () => {
    it('see invitationsReceived', () => {
      const comments = [
        {
          id: 1,
          profileImage: 'image_address',
          nickname: 'user1',
          content: '댓글 내용',
          createdAt: '2022-01-34',
        },
      ];

      renderComments(comments);

      screen.getByText('댓글 내용');
    });
  });

  context('when change Comment', () => {
    it('changeComment to be called', async () => {
      const comments = [
        {
          id: 1,
          profileImage: 'image_address',
          nickname: 'user1',
          content: '댓글 내용',
          createdAt: '2022-01-34',
        },
      ];

      renderComments(comments);

      fireEvent.change(screen.getByLabelText('댓글'), {
        target: { value: '댓글내용입니다' },
      });

      await waitFor(() => {
        expect(changeContentTestFunction).toBeCalledWith('댓글내용입니다');
      });
    });
  });

  context('when submit Comment', () => {
    it('submit to be called', async () => {
      renderComments();

      fireEvent.change(screen.getByLabelText('댓글'), {
        target: { value: '댓글내용입니다' },
      });

      fireEvent.click(screen.getByRole('button', { name: '등록' }));

      await waitFor(() => {
        expect(createCommentTestFunction).toBeCalled();
      });
    });
  });

  context('when change InputMode reply', () => {
    it('see comments', async () => {
      const comments = [
        {
          id: 1,
          profileImage: 'image_address',
          nickname: 'user1',
          content: '댓글 내용',
          createdAt: '2022-01-34',
        },
      ];

      renderComments(comments);

      fireEvent.click(screen.getByRole('button', { name: '답글달기' }));

      await waitFor(() => {
        screen.getByText(/님에게 답글 남기는중../);
      });
    });
  });
});
