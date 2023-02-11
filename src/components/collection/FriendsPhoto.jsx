import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LikeOff, LikeOn } from '../../assets/common';
import usePhotoBookStore from '../../hooks/usePhotoBookStore';
import dateFormat from '../../utils/dateFormat';
import useUserStore from '../../hooks/useUserStore';

const Container = styled.div`
  height: 100%;
  background-color: white;
  padding: .1em;
`;

const Post = styled.li`
  background-color: white;
  border-radius: 1em;
  margin-bottom: .2em;

  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0.3, 0.3);
`;

const ProfileStyledLink = styled(Link)`
  display: flex;
  justify-items: center;
  align-items: center;
  margin-bottom: .3em;

  p {
    font-weight: 600;
    margin-left: .5em;
  }
`;

const Image = styled.img`
  width: 50px;
  height: 50px;

  margin-top: .3em;
  margin-left: .3em;

  border-radius: 1em;
  object-fit: fill;
`;

const Photo = styled.img`
  width: 100%;
  height: 340px;
  object-fit: fill;
`;

const Count = styled.div`
  padding: .5em .7em;
  display: flex;
  justify-content: space-between;

  span {
    padding-left: .3em;
    font-size: 1.5em;
  }
`;

const Content = styled.div`
  padding: .0em .7em;
  display: flex;
  flex-direction: column;

  p:nth-child(1) {
    font-size: .8em;
  }
  p:nth-child(2) {
    font-size: 1.2em;
    padding: .7em 0em;
  }
`;

export default function FriendsPhoto() {
  const photoBookStore = usePhotoBookStore();
  const userStore = useUserStore();

  const { friendsPhotos } = photoBookStore;
  const { nickname } = userStore;

  const handleClickLike = async (id) => {
    await photoBookStore.likePhoto(id);
    await photoBookStore.fetchFriendsPhotos();
  };

  if (friendsPhotos === undefined) {
    return ((
      <p>Loading..</p>
    ));
  }

  const isActive = (friendPhoto) => (
    friendPhoto.likers.includes(nickname)
      ? LikeOn
      : LikeOff
  );

  return ((
    <Container>
      <ul>
        {friendsPhotos.map((friendPhoto) => (
          <Post key={friendPhoto.photo.id}>
            <ProfileStyledLink to={`/${friendPhoto.nickname}`}>
              <Image src={friendPhoto.profileImage} alt="프로필이미지" />
              <p>{friendPhoto.nickname}</p>
            </ProfileStyledLink>
            <Link to={`/${friendPhoto.nickname}/photos/${friendPhoto.photo.id}`}>
              <Photo src={friendPhoto.photo.image} alt="프로필이미지" />
            </Link>
            <Count>
              <button type="button" onClick={() => handleClickLike(friendPhoto.photo.id)}>
                <img src={isActive(friendPhoto)} alt="좋아요 버튼" />
                <span>{friendPhoto.likers.length}</span>
              </button>
              <Link to={`/${friendPhoto.nickname}/photos/${friendPhoto.photo.id}`}>
                댓글
                {' '}
                {friendPhoto.commentsCount}
              </Link>
            </Count>
            <Content>
              <p>{dateFormat(friendPhoto.photo.createdAt)}</p>
              <p>{friendPhoto.photo.explanation}</p>
            </Content>
          </Post>
        ))}
      </ul>
    </Container>
  ));
}
