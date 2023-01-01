import { Link } from 'react-router-dom';
import usePhotoBookStore from '../hooks/usePhotoBookStore';

export default function PhotoBook({ nickname }) {
  const photoBookStore = usePhotoBookStore();

  const { photoBook } = photoBookStore;

  if (!photoBook) {
    return <p>loading...</p>;
  }

  return ((
    <div>
      <p>사진첩</p>
      <ul>
        {photoBook.map((photo) => (
          <li key={photo.id}>
            <Link to={`/photos/${photo.id}`}>
              <img
                src={photo.image}
                alt="사진"
                height="150px"
              />
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/photos/write">추가</Link>
    </div>
  ));
}
