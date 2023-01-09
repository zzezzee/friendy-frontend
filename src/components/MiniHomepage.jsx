import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useProfileStore from '../hooks/useProfileStore';
import useUserStore from '../hooks/useUserStore';
import GuestBook from './guestBook/GuestBook';
import PhotoBook from './photoBook/PhotoBook';

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1em;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: fill;
`;

const Information = styled.header`
  border-bottom: 1px solid black;
  padding: 1em;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: .5em;

`;

const Button = styled.button`
  background-color: white;
  border: none;
  font-size: 1em;
  border-bottom:${(props) => (props.selected ? '3px solid purple' : 'none')};
  
`;

export default function MiniHomepage() {
  const profileStore = useProfileStore();
  const userStore = useUserStore();

  const [menu, setMenu] = useState('photoBook');

  const { relationShip } = userStore;

  const { nickname, profileImage, introduction } = profileStore;

  const handleClickAddFriend = () => {

  };

  const handleClickSeePhotoBook = () => {
    setMenu('photoBook');
  };

  const handleClickSeeGuestBook = () => {
    setMenu('guestBook');
  };

  return ((
    <Container>
      <Information>
        <div>
          <Title>
            {nickname}
            의 미니홈피
          </Title>
          {relationShip === 'stranger'
            ? (
              <button type="button" onClick={handleClickAddFriend}>
                일촌 신청
              </button>
            )
            : null }
        </div>
        <Image src={profileImage} alt="프로필사진" height="150px" />
        <p>{introduction}</p>
        {relationShip === 'me'
          ? <Link to="/change-profile">수정</Link>
          : null}
        <p />
        <p>일촌: 30</p>
        <p>즐겨찾기: 30</p>
      </Information>
      <Menu>
        <Button
          type="button"
          onClick={handleClickSeePhotoBook}
          selected={menu === 'photoBook'}
        >
          사진첩
        </Button>
        <Button
          type="button"
          onClick={handleClickSeeGuestBook}
          selected={menu === 'guestBook'}
        >
          방명록
        </Button>
      </Menu>
      {menu === 'photoBook'
        ? <PhotoBook />
        : <GuestBook />}
    </Container>
  ));
}
