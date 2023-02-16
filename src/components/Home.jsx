import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import { MainPhoto } from '../assets/common';
import { Logo } from '../assets/header';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  flex-direction: flex;
  align-items: center;

  p{
    text-align: center;
    margin-top: 2.5em;
    font-size: .7em;
  }
`;

const LogoWrapper = styled.h1`
  width: 200px;
  height: 150px;
`;

const HomeLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;

  background: url(${Logo}) no-repeat 0 50%;
  background-size: contain;

  text-indent: -10000px;
`;

const Photo = styled.img`
  width: 100%;
  height: 340px;
  object-fit: fill;
`;

const StyledLink = styled(Link)`
    align-self: center;
    border: 1px solid #EAEAEC;
    padding: .5em 11em;
    font-size: .9em;
    font-weight: 600;
    background-color: #fff2cc;
    border-radius: 2em;
    margin-left: 1em;
`;

export default function Home() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const [accessToken] = useLocalStorage('accessToken', '');

  const { nickname } = userStore;

  useEffect(() => {
    if (accessToken) {
      navigate(`/${nickname}`);
    }
  }, []);

  return ((
    <Container>
      <LogoWrapper>
        <HomeLink to="/">
          Friendy
        </HomeLink>
      </LogoWrapper>
      <Photo src={MainPhoto} alt="" />
      <StyledLink to="/login">로그인</StyledLink>
      <p>회원가입</p>
    </Container>
  ));
}
