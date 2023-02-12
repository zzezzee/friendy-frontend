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

  width: 100%;
`;

const ButtonBox = styled.div`
  width: 100%;
  text-align: center;

  padding: .5em;
  border-bottom:${(props) => (props.selected ? '3px solid #FAD15B' : 'none')};
`;

const Content = styled.div`
  margin-top: 1em;
  padding-bottom: 1em;
  background-color: white;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 10, 0.3);

  border-radius: 1em;
`;

const Button = styled.button`
  background-color: white;
  border: none;
  font-size: .9em;
  font-weight: 500;
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
      <Content>
        <Menu>
          <ButtonBox selected={menu === 'photoBook'}>
            <Button
              type="button"
              onClick={handleClickSeePhotoBook}
              selected={menu === 'photoBook'}
            >
              사진첩
            </Button>
          </ButtonBox>
          <ButtonBox selected={menu === 'guestBook'}>
            <Button
              type="button"
              onClick={handleClickSeeGuestBook}
            >
              방명록
            </Button>
          </ButtonBox>
        </Menu>
        {menu === 'photoBook'
          ? <PhotoBook />
          : <GuestBook />}
      </Content>
    </Container>
  ));
}
