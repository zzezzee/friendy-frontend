import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCommentStore from '../../hooks/useCommentStore';
import usePhotoBookStore from '../../hooks/usePhotoBookStore';
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

export default function PhotoDetail({ id }) {
  const photoBookStore = usePhotoBookStore();
  const commentStore = useCommentStore();

  const navigate = useNavigate();

  const { photo } = photoBookStore;
  const { comments } = commentStore;

  const handleClickDelete = async () => {
    await photoBookStore.deletePhoto(id);

    navigate(-1);
  };

  const handleClickEdit = async () => {
    navigate(`/photo/edit/${id}`);
  };

  return ((
    <Container>
      <Photo>
        <Image src={photo.image} alt="사진첩 이미지" />
        <p>{photo.explanation}</p>
        <button type="button" onClick={handleClickDelete}>삭제</button>
        <button type="button" onClick={handleClickEdit}>수정</button>
      </Photo>
      <Comments comments={comments} postId={id} postType="photo" />
    </Container>
  ));
}
