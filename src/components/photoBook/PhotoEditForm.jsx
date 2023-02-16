import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import usePhotoBookStore from '../../hooks/usePhotoBookStore';
import usePhotoRegistrationFormStore from '../../hooks/usePhotoRegistrationFormStore';

const Container = styled.div`
  h1{
    text-align: center;
    padding: .3em;;
    margin-bottom: .6em;
    font-weight: 600;
    border-bottom: 3px solid #FAD15B;
  }
  padding: 1em;
  background-color: white;
  border-radius: 1em;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 10, 0.3);

  textarea{
    width: 100%;
    height: 200px;
  }
`;

const Image = styled.img`
  width: 355px;
  height: 355px;
  
  border-radius: 1em;
  margin-right: 1em;
  object-fit: fill;
`;

const SubmitButton = styled.button`
    align-self: right;
    border: 1px solid #EAEAEC;
    padding: .3em .5em;
    font-size: .8em;
    font-weight: 600;
    background-color: #fff2cc;
    border-radius: 1em;
`;
export default function PhotoEditForm() {
  const navigate = useNavigate();

  const photoRegistrationFormStore = usePhotoRegistrationFormStore();
  const photoBookStore = usePhotoBookStore();

  const location = useLocation();
  const id = parseInt(location.pathname?.split('/')[3] || '', 10);

  const [showImages, setShowImages] = useState('');

  const handleAddImages = (event) => {
    const image = event.target.files[0];
    photoRegistrationFormStore.changeImage(image);

    const currentImageUrl = URL.createObjectURL(image);

    setShowImages(currentImageUrl);
  };

  const handleChangeExplanation = (event) => {
    photoRegistrationFormStore.changeExplanation(event.target.value);
  };

  const handleDeleteImage = () => {
    setShowImages('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { image, explanation } = photoRegistrationFormStore;

    const formData = new FormData();

    formData.append('multipartFile', image);

    await photoBookStore.editPhoto(id, formData, explanation);

    navigate(-1);
  };

  return (
    <Container>
      <h1>사진 수정</h1>
      {showImages !== ''
        ? (
          <div>
            <Image
              src={showImages}
              alt="이미지 미리보기"
              height="150px"
            />
          </div>
        )
        : null }
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-photo">
          <input
            id="input-photo"
            data-testid="file-input"
            type="file"
            accept="image/*"
            onChange={handleAddImages}
          />
        </label>
        <label htmlFor="input-introduction">
          <textarea
            id="input-introduction"
            type="text"
            onChange={handleChangeExplanation}
          />
        </label>
        <SubmitButton type="submit">수정</SubmitButton>
      </form>
    </Container>
  );
}
