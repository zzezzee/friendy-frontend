import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCommentStore from '../../hooks/useCommentStore';
import useGuestBookStore from '../../hooks/useGuestBookStore';
import Comments from '../Comment';

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: fill;
`;

const Container = styled.div`
  padding: 2em;
`;

export default function GuestBookDetail({ id }) {
  const guestBookStore = useGuestBookStore();
  const commentStore = useCommentStore();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { guestBook } = guestBookStore;
  const { comments } = commentStore;

  const handleClickDelete = async () => {
    await guestBookStore.deleteGuestBook(id);

    navigate(-1);
  };

  const handleClickEdit = async () => {
    navigate(`/guest-books/edit/${id}`);
  };

  const handleClickChangeOpen = async () => {
    setOpen(!open);
  };

  return ((
    <Container>
      <Image src={guestBook.profileImage} alt="방명록 이미지" />
      <p>{guestBook.nickname}</p>
      <p>{guestBook.content}</p>
      <button type="button" onClick={handleClickChangeOpen}>...</button>
      {open === true
        ? (
          <div>
            <button type="button" onClick={handleClickDelete}>삭제</button>
            <button type="button" onClick={handleClickEdit}>수정</button>
          </div>
        )
        : null}
      <Comments comments={comments} postId={id} postType="guestBook" />
    </Container>
  ));
}
