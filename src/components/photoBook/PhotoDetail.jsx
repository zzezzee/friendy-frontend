import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import usePhotoBookStore from '../../hooks/usePhotoBookStore';

const Image = styled.img`
  width: 360px;
  height: 360px;
  object-fit: fill;
`;

const Container = styled.div`
  padding: 1em;
`;

export default function PhotoDetail() {
  const photoBookStore = usePhotoBookStore();
  const navigate = useNavigate();

  const location = useLocation();

  const id = parseInt(location.pathname?.split('/')[3] || '', 10);

  const { photoBook } = photoBookStore;

  const photo = photoBook?.find((e) => e.id === id) || {};

  const handleClickDelete = async () => {
    await photoBookStore.deletePhoto(id);

    navigate(-1);
  };

  const handleClickEdit = async () => {
    navigate(`/photo/edit/${id}`);
  };

  return ((
    <Container>
      <Image src={photo.image} alt="사진첩 이미지" />
      <p>{photo.explanation}</p>
      <button type="button" onClick={handleClickDelete}>삭제</button>
      <button type="button" onClick={handleClickEdit}>수정</button>
    </Container>
  ));
}
