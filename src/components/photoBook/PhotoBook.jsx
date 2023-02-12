import { Link } from 'react-router-dom';
import styled from 'styled-components';
import usePhotoBookStore from '../../hooks/usePhotoBookStore';
import useUserStore from '../../hooks/useUserStore';

const Container = styled.div`

`;

const Image = styled.img`
  width: 127px;
  height: 127px;

  border-radius: .3em;
  object-fit: fill;
`;

const List = styled.ul`
  display: flex;
  gap: .2em;
  flex-wrap: wrap;


`;

const AddButton = styled.div`
  text-align: right;

  a {
    border: 1px solid #EAEAEC;
    padding: .3em .5em;
    margin-right: 1em;
    font-size: .8em;
    font-weight: 400;
    background-color: #fff2cc;
    border-radius: 1em;
  }
`;

export default function PhotoBook() {
  const photoBookStore = usePhotoBookStore();
  const userStore = useUserStore();

  const { photoBook } = photoBookStore;
  const { relationship } = userStore;

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
          : null}
      </List>
      <AddButton>
        {relationship === 'me'
          ? <Link to="/photos/write">사진 추가</Link>
          : null}
      </AddButton>
    </Container>
  ));
}
