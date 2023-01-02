import { Link } from 'react-router-dom';
import styled from 'styled-components';
import usePhotoBookStore from '../hooks/usePhotoBookStore';

const Container = styled.div`
  padding: 1em;
`;

const Image = styled.img`
  width: 170px;
  height: 170px;
  object-fit: fill;
`;

const List = styled.ul`
  display: flex;
  gap: 1em;
`;

export default function PhotoBook() {
  const photoBookStore = usePhotoBookStore();

  const { photoBook } = photoBookStore;

  if (!photoBook) {
    return <p>loading...</p>;
  }

  return ((
    <Container>
      <p>사진첩</p>
      <List>
        {photoBook.map((photo) => (
          <li key={photo.id}>
            <Link to={`photos/${photo.id}`}>
              <Image
                src={photo.image}
                alt="사진"
                height="150px"
              />
            </Link>
          </li>
        ))}
      </List>
      <Link to="/photos/write">추가</Link>
    </Container>
  ));
}
