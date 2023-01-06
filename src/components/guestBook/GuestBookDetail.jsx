import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useGuestBookStore from '../../hooks/useGuestBookStore';

const Image = styled.img`
  width: 520px;
  height: 520px;
  object-fit: fill;
`;

const Container = styled.div`
  padding: 2em;
`;

export default function GuestBookDetail({ id }) {
  const guestBookStore = useGuestBookStore();
  const navigate = useNavigate();

  const { guestBook } = guestBookStore;

  const handleClickDelete = async () => {
    await guestBookStore.deleteGuestBook(id);

    navigate(-1);
  };

  const handleClickEdit = async () => {
    // navigate(`/photo/edit/${id}`);
  };

  return ((
    <Container>
      <Image src={guestBook.profileImage} alt="방명록 이미지" />
      <p>{guestBook.nickname}</p>
      <p>{guestBook.content}</p>
      <button type="button" onClick={handleClickDelete}>삭제</button>
      <button type="button" onClick={handleClickEdit}>수정</button>
      <p>여기엔 댓글이 들어가겠죠</p>
    </Container>
  ));
}
