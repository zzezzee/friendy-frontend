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

const context = describe;

describe('Comments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderComments(comments) {
    render((
      <ThemeProvider theme={theme}>
        <Comments
          comments={comments}
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
});
