import { EventSourcePolyfill } from 'event-source-polyfill';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useLoginFormStore from '../hooks/useLoginFormStore';
import useNotificationStore from '../hooks/useNotificationStore';
import useUserStore from '../hooks/useUserStore';

export default function LoginForm() {
  const navigate = useNavigate();
  const loginFormStore = useLoginFormStore();
  const userStore = useUserStore();
  const notificationStore = useNotificationStore();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const handleChangeUsername = (e) => {
    loginFormStore.changeUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    loginFormStore.changePassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    loginFormStore.validate();

    if (loginFormStore.validateFailed()) {
      return;
    }

    const { username, password } = loginFormStore;

    const accessToken = await userStore.login({ username, password });

    setAccessToken(accessToken);

    navigate('/');
  };

  return ((
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="input-username"
          type="text"
          name="username"
          placeholder="아이디"
          value={loginFormStore.username}
          onChange={handleChangeUsername}
        />
        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="비밀번호"
          value={loginFormStore.password}
          onChange={handleChangePassword}
        />
        {loginFormStore.errors
          ? loginFormStore.errors
          : null}
        <button type="submit">로그인</button>
      </form>
      <a href="/">회원가입</a>
    </div>
  ));
}
