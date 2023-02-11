import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import { MainPhoto } from '../assets/common';
import { Logo } from '../assets/header';
import useUserStore from '../hooks/useUserStore';

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
    <div>
      <LogoWrapper>
        <HomeLink to="/">
          Friendy
        </HomeLink>
      </LogoWrapper>
      <Photo src={MainPhoto} alt="" />
      <Link to="/login">로그인</Link>
    </div>
  ));
}
