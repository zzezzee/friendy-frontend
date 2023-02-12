import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCommentStore from '../../hooks/useCommentStore';
import useGuestBookStore from '../../hooks/useGuestBookStore';
import Comments from '../Comment';

const Container = styled.div`
`;

const Image = styled.img`
  display: block;

  height: 90px;
  width: 90px;
  margin-right: .3em;
  object-fit: fill;
`;

const GuestBook = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: .3em;
  border-radius: 1em 1em 0em 0em;

  box-shadow: 1px 1px 1px 0.1px rgba(0, 0, 0.3, 0.3);

  margin-bottom: 1em;
`;

const Content = styled.div`
  padding: .2em 1em;
  
  width: calc(100% - 90px);

  border-radius: .4em;
  box-shadow: inset .1px .1px 1px .5px rgba(0, 0, 0.3, 0.3);

  p:nth-child(1){
    font-size: 1.3em;
    font-weight: 500;
    margin-bottom: .5em;
  }

  p:nth-child(2){
    margin-bottom: 1.6em;
  }
  div{
    font-size: .7em;

    button {
      font-size: .8em;
      font-weight: 300;
      margin-right: 1em;
    }
  }
`;

export default function GuestBookDetail({ id, currentNickname }) {
  const guestBookStore = useGuestBookStore();
  const commentStore = useCommentStore();

  const navigate = useNavigate();

  const { guestBook } = guestBookStore;
  const { comments } = commentStore;

  const handleClickDelete = async () => {
    await guestBookStore.deleteGuestBook(id);

    navigate(-1);
  };

  const handleClickEdit = async () => {
    navigate(`/guest-books/edit/${id}`);
  };

  return ((
    <Container>
      <GuestBook>
        <Image src={guestBook.profileImage} alt="방명록 이미지" />
        <Content>
          <p>{guestBook.nickname}</p>
          <p>{guestBook.content}</p>
          <div>
            <button type="button" onClick={handleClickDelete}>삭제</button>
            <button type="button" onClick={handleClickEdit}>수정</button>
          </div>
        </Content>
      </GuestBook>
      <Comments comments={comments} postId={id} postType="guestBook" miniHomepageOwner={currentNickname} />
    </Container>
  ));
}
