import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LikeOff, LikeOn } from '../../assets/common';
import useCommentStore from '../../hooks/useCommentStore';
import usePhotoBookStore from '../../hooks/usePhotoBookStore';
import useUserStore from '../../hooks/useUserStore';
import dateFormat from '../../utils/dateFormat';
import Comments from '../Comment';

const Container = styled.div`
  padding-bottom: 3em;
`;

const Photo = styled.div`
  background-color: white;
  padding: .3em;
  border-radius: 1em 1em 0em 0em;

  box-shadow: 1px 1px 1px 0.1px rgba(0, 0, 0.3, 0.3);

  margin-bottom: 1em;
`;

const Image = styled.img`
  border-radius: 1em;

  width: 100%;
  height: 390px;
  object-fit: fill;
`;

const Like = styled.div`
  display: flex;

  div{
    font-size: 1.2em;
    margin-left: .2em;
  }
`;

const Content = styled.div`
  padding: 1em;

  border-radius: .4em;
  box-shadow: inset .1px .1px 1px .5px rgba(0, 0, 0.3, 0.3);

  p{
    margin: .5em 0em;
    font-size: 1.3em;
  }

  footer{
    display: flex;
    justify-content: space-between;

    font-size: .7em;

    button {
      font-size: .8em;
      margin: 0em .5em;
      font-weight: 300;
    }
  }
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

  const isActive = () => (
    likes.filter((like) => (like.nickname === nickname)).length === 1
      ? LikeOn
      : LikeOff
  );

  return ((
    <Container>
      <Photo>
        <Image src={photo.image} alt="사진첩 이미지" />
        <Content>
          <Like>
            <button type="button" onClick={() => handleClickLike()}>
              <img src={isActive(photo)} alt="좋아요 버튼" />
            </button>
            <div>{likes.length}</div>
          </Like>
          <p>{photo.explanation}</p>
          <footer>
            <div>{dateFormat(photo.createdAt)}</div>
            {currentNickname === nickname
              ? (
                <div>
                  <button type="button" onClick={handleClickDelete}>삭제</button>
                  <button type="button" onClick={handleClickEdit}>수정</button>
                </div>
              )
              : null}
          </footer>
        </Content>
      </Photo>
      <Comments comments={comments} postId={id} postType="photo" miniHomepageOwner={currentNickname} />
    </Container>
  ));
}
