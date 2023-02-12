import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useGuestBookStore from '../../hooks/useGuestBookStore';

const Container = styled.div`
  padding-inline: .5em;
`;

const Image = styled.img`
  width: 90px;
  height: 90px;

  border-radius: .3em;

  object-fit: fill;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;


  gap: .5em;
`;

const Item = styled.li`
  display: flex;
  flex-direction: row;

  gap: 1em;
`;

const Content = styled.div`
  p:nth-child(1){
    font-weight: 600;
    margin-bottom: 1em;
  }
  p:nth-child(2){
    font-size: .9em;
    font-weight: 500;
  }
`;

const AddButton = styled.div`
  text-align: right;

  a {
    border: 1px solid #EAEAEC;
    padding: .3em .5em;
    margin-right: 1em;
    font-size: .8em;
    font-weight: 400;
    background-color: #fff2cc;
    border-radius: 1em;
  }
`;

export default function GuestBook() {
  const guestBookStore = useGuestBookStore();

  const { guestBookList } = guestBookStore;

  return ((
    <Container>
      <List>
        {guestBookList.length !== 0
          ? guestBookList.map((guestBook) => (
            <Link to={`guest-books/${guestBook.id}`} key={guestBook.id}>
              <Item>
                <Image src={guestBook.profileImage} alt="미니홈피 이미지" />
                <Content>
                  <p>{guestBook.nickname}</p>
                  <p>{guestBook.content}</p>
                </Content>
              </Item>
            </Link>
          ))
          : null}
      </List>
      <AddButton>
        <Link to="guest-books/write">방명록 추가</Link>
      </AddButton>
    </Container>
  ));
}
