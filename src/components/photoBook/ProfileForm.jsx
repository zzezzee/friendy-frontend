import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMiniHomepageStore from '../../hooks/useMiniHomepageStore';
import useProfileFormStore from '../../hooks/useProfileFormStore';

export default function ProfileForm() {
  const navigate = useNavigate();

  const profileFormStore = useProfileFormStore();
  const miniHomepageStore = useMiniHomepageStore();

  const [showImages, setShowImages] = useState('');

  const handleAddImages = (event) => {
    const image = event.target.files[0];
    profileFormStore.changeProfileImage(image);

    const currentImageUrl = URL.createObjectURL(image);

    setShowImages(currentImageUrl);
  };

  const handleChangeIntroduction = (event) => {
    profileFormStore.changeIntroduction(event.target.value);
  };

  const handleDeleteImage = () => {
    setShowImages('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { profileImage, introduction } = profileFormStore;

    const formData = new FormData();

    formData.append('multipartFile', profileImage);

    await miniHomepageStore.patch(formData, introduction);

    navigate(-1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-photo">
          사진 등록
          <input
            id="input-photo"
            type="file"
            accept="image/*"
            onChange={handleAddImages}
          />
        </label>
        <label htmlFor="input-introduction">
          미니홈피 소개
          <input
            id="input-introduction"
            type="text"
            onChange={handleChangeIntroduction}
          />
        </label>
        <button type="submit">수정 완료</button>
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
