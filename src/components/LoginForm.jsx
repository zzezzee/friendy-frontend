import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useLoginFormStore from '../hooks/useLoginFormStore';
import useNotificationStore from '../hooks/useNotificationStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  height: 90%;

  h1 {
    text-align: center;
    font-size: 2em;
    font-weight: 700;
    margin-top: 3em;
  }

  p{    
    text-align: center;
    margin-top: 2.5em;
    font-size: .7em;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;


  input{
    border: 1px solid gray;
    padding: 2em 2.5em;
    margin: 1em 3em;

    border-radius: 1em;
  }

  button {
    align-self: center;
    border: 1px solid #EAEAEC;
    padding: .5em 9em;
    font-size: .9em;
    font-weight: 600;
    background-color: # ;
    border-radius: 2em;
  }
`;

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
    <Container>
      <h1>LOGIN</h1>
      <Form onSubmit={handleSubmit}>
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
      </Form>
      <p>회원가입</p>
    </Container>
  ));
}
