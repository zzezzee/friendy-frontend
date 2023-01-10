import { useState } from 'react';
import styled from 'styled-components';
import useUserStore from '../../hooks/useUserStore';
import GuestBook from '../guestBook/GuestBook';
import PhotoBook from '../photoBook/PhotoBook';
import Information from './Information';

const Container = styled.div`
  width: 100%;
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
  const userStore = useUserStore();

  const [menu, setMenu] = useState('photoBook');

  const { relationship } = userStore;

  const handleClickSeePhotoBook = () => {
    setMenu('photoBook');
  };

  const handleClickSeeGuestBook = () => {
    setMenu('guestBook');
  };

  return ((
    <Container>
      <Information relationship={relationship} />
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
