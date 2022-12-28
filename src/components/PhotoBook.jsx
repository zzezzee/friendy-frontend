import { Link } from 'react-router-dom';
import usePhotoBookStore from '../hooks/usePhotoBookStore';

export default function PhotoBook({ nickname }) {
  const photoBookStore = usePhotoBookStore();

  const { photoBook } = photoBookStore;

  // const photoBook = [
  //   {
  //     id: 1,
  //     image: 'https://friendyimages.s3.ap-northeast-2.amazonaws.com/photo1.avif',
  //     explanation: '사진 설명입니다',
  //   },
  //   {
  //     id: 2,
  //     image: 'https://friendyimages.s3.ap-northeast-2.amazonaws.com/photo2.avif',
  //     explanation: '사진 설명입니다',
  //   },
  // ];

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
      <button type="button">추가</button>
    </div>
  ));
}
