import { logDOM } from '@testing-library/dom';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCommentStore from '../../hooks/useCommentStore';
import usePhotoBookStore from '../../hooks/usePhotoBookStore';
import useStore from '../../hooks/useStore';
import useUserStore from '../../hooks/useUserStore';
import dateFormat from '../../utils/dateFormat';
import Comments from '../Comment';

const Photo = styled.div`
  margin-bottom: 2em;
`;

const Image = styled.img`
  width: 360px;
  height: 360px;
  object-fit: fill;
`;

const Container = styled.div`
  padding: 1em;
`;

export default function PhotoDetail({ id, currentNickname }) {
  const photoBookStore = usePhotoBookStore();
  const commentStore = useCommentStore();
  const userStore = useUserStore();

  const navigate = useNavigate();

  const { photo, likes } = photoBookStore;
  const { comments } = commentStore;
  const { nickname } = userStore;

  const handleClickDelete = async () => {
    await photoBookStore.deletePhoto(id);

    navigate(-1);
  };

  const handleClickLike = async () => {
    await photoBookStore.likePhoto(id);
    await photoBookStore.fetchPhoto(id);
  };

  const handleClickEdit = async () => {
    navigate(`/photo/edit/${id}`);
  };

  return ((
    <Container>
      <Photo>
        <Image src={photo.image} alt="사진첩 이미지" />
        <button type="button" onClick={handleClickLike}>좋아요</button>
        <p>{likes.length}</p>
        <p>{photo.explanation}</p>
        <p>{dateFormat(photo.createdAt)}</p>
        {currentNickname === nickname
          ? (
            <div>
              <button type="button" onClick={handleClickDelete}>삭제</button>
              <button type="button" onClick={handleClickEdit}>수정</button>
            </div>
          )
          : null}
      </Photo>
      <Comments comments={comments} postId={id} postType="photo" />
    </Container>
  ));
}
