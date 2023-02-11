import { logDOM } from '@testing-library/dom';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LikeOff, LikeOn } from '../../assets/common';
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

  console.log(likes);

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

  const isActive = () => (
    likes.filter((like) => (like.nickname === nickname)).length === 1
      ? LikeOn
      : LikeOff
  );

  return ((
    <Container>
      <Photo>
        <Image src={photo.image} alt="사진첩 이미지" />
        <button type="button" onClick={() => handleClickLike()}>
          <img src={isActive(photo)} alt="좋아요 버튼" />
          <span>{likes.length}</span>
        </button>
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
      <Comments comments={comments} postId={id} postType="photo" miniHomepageOwner={currentNickname} />
    </Container>
  ));
}
