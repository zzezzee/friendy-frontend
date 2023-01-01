import { useState } from 'react';

export default function PhotoRegistration() {
  const [showImages, setShowImages] = useState([]);

  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i += 1) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
  };

  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <div>
      <p>사진 등록</p>
      <label htmlFor="input-file" onChange={handleAddImages}>
        <input type="file" id="input-file" multiple />
      </label>
      {showImages.map((image, id) => (
        <div key={id}>
          <img
            src={image}
            alt={`${image}-${id}`}
            height="150px"
          />
          <button type="button" onClick={() => handleDeleteImage(id)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
