import { logDOM } from '@testing-library/dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import usePhotoBookStore from '../../hooks/usePhotoBookStore';
import dateFormat from '../../utils/dateFormat';

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: fill;
`;

const Photo = styled.img`
  width: 280px;
  height: 280px;
  object-fit: fill;
`;

export default function FriendsPhoto() {
  const photoBookStore = usePhotoBookStore();

  const { friendsPhotos } = photoBookStore;

  const handleClickLike = async (id) => {
    await photoBookStore.likePhoto(id);
    await photoBookStore.fetchFriendsPhotos();
  };

  if (friendsPhotos === undefined) {
    return ((
      <p>Loading..</p>
    ));
  }

  return ((
    <div>
      <ul>
        {friendsPhotos.map((friendPhoto) => (
          <li key={friendPhoto.photo.id}>
            <Link to={`/${friendPhoto.nickname}`}>
              <Image src={friendPhoto.profileImage} alt="프로필이미지" />
              <p>{friendPhoto.nickname}</p>
            </Link>
            <Link to={`/${friendPhoto.nickname}/photos/${friendPhoto.photo.id}`}>
              <Photo src={friendPhoto.photo.image} alt="프로필이미지" />
            </Link>
            <div>
              <p>
                <button type="button" onClick={() => handleClickLike(friendPhoto.photo.id)}>좋아요</button>
                {friendPhoto.likeCount}
              </p>
              <p>
                댓글
                {friendPhoto.commentsCount}
              </p>
              <p>{dateFormat(friendPhoto.photo.createdAt)}</p>
            </div>
            <p>{friendPhoto.photo.explanation}</p>
          </li>
        ))}
      </ul>
    </div>
  ));
}
