import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import usePhotoBookStore from '../../hooks/usePhotoBookStore';
import usePhotoRegistrationFormStore from '../../hooks/usePhotoRegistrationFormStore';

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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-photo">
          사진 수정
          <input
            id="input-photo"
            data-testid="file-input"
            type="file"
            accept="image/*"
            onChange={handleAddImages}
          />
        </label>
        <label htmlFor="input-introduction">
          사진 설명
          <input
            id="input-introduction"
            type="text"
            onChange={handleChangeExplanation}
          />
        </label>
        <button type="submit">수정</button>
      </form>
      {showImages !== ''
        ? (
          <div>
            <img
              src={showImages}
              alt="이미지 미리보기"
              height="150px"
            />
            <button type="button" onClick={handleDeleteImage}>
              삭제
            </button>
          </div>
        )
        : null }
    </div>
  );
}
