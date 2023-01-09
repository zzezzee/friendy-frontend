import { Link } from 'react-router-dom';
import styled from 'styled-components';
import usePhotoBookStore from '../../hooks/usePhotoBookStore';
import useUserStore from '../../hooks/useUserStore';

const Container = styled.div`
  padding: 0em;
`;

const Image = styled.img`
  width: 127px;
  height: 127px;
  object-fit: fill;
`;

const List = styled.ul`
  display: flex;
  gap: .2em;
  flex-wrap: wrap;
`;

export default function PhotoBook() {
  const photoBookStore = usePhotoBookStore();
  const userStore = useUserStore();

  const { photoBook } = photoBookStore;
  const { relationShip } = userStore;

  if (!photoBook) {
    return <p>loading...</p>;
  }

  return ((
    <Container>
      <List>
        {photoBook.length !== 0
          ? photoBook.map((photo) => (
            <li key={photo.id}>
              <Link to={`photos/${photo.id}`}>
                <Image
                  src={photo.image}
                  alt={`사진${photo.id}`}
                />
              </Link>
            </li>
          ))
          : <p>사진을 추가해 주세요</p>}
      </List>
      {relationShip === 'me'
        ? <Link to="/photos/write">추가</Link>
        : null}
    </Container>
  ));
}
