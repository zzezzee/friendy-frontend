import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/Theme';
import Information from './Information';

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

jest.mock('../../hooks/useProfileStore', () => () => ({
  nickname: 'zzezze',
  profileImage: 'image_address',
  introduction: '미니홈피 소개',
}));

const sendInvitationTestFunction = jest.fn();

jest.mock('../../hooks/useFriendStore', () => () => ({
  friends: [
    {
      id: 1,
      nickname: 'zzezze',
      profileImage: 'image_address',
    },
  ],
  sendInvitation: sendInvitationTestFunction,
}));

const context = describe;

describe('Information', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderInformation(relationship) {
    render((
      <ThemeProvider theme={theme}>
        <Information relationship={relationship} />
      </ThemeProvider>
    ));
  }

  context('when into My miniHomepage', () => {
    it('see Information', () => {
      renderInformation();

      screen.getByText(/zzezze/);
      screen.getByText(/일촌/);
      screen.getByText(/즐겨찾기/);
    });

    it('see number of friends', () => {
      renderInformation();

      screen.getByText('일촌: 1');
    });
  });

  context('when click 일촌', () => {
    it('일촌 목록으로 이동', async () => {
      const relationship = 'stranger';

      renderInformation(relationship);

      expect(screen.getByText('일촌: 1').closest('a')).toHaveAttribute('href', 'friends');
    });
  });

  context('when click 일촌신청', () => {
    it('일촌신청 함수 호출', async () => {
      const relationship = 'stranger';

      renderInformation(relationship);

      fireEvent.click(screen.getByRole('button', { name: '일촌 신청' }));

      await waitFor(() => {
        expect(sendInvitationTestFunction).toBeCalled();
      });
    });
  });
});
