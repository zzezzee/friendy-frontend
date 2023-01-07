import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useGuestBookStore from '../../hooks/useGuestBookStore';
import useProfileStore from '../../hooks/useProfileStore';

const Image = styled.img`
  width: 90px;
  height: 90px;
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
export default function GuestBook() {
  const guestBookStore = useGuestBookStore();

  const { guestBookList } = guestBookStore;

  return ((
    <div>
      <p>방명록</p>
      <List>
        {guestBookList.length !== 0
          ? guestBookList.map((guestBook) => (
            <Link to={`guest-books/${guestBook.id}`} key={guestBook.id}>
              <Item>
                <Image src={guestBook.profileImage} alt="미니홈피 이미지" />
                <div>
                  <p>{guestBook.nickname}</p>
                  <p>{guestBook.content}</p>
                </div>
              </Item>
            </Link>
          ))
          : <p>방명록을 추가해보세요!</p>}
      </List>
      <Link to="guest-books/write">추가</Link>
    </div>
  ));
}
