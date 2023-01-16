import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PhotoDetail from '../components/photoBook/PhotoDetail';
import usePhotoBookStore from '../hooks/usePhotoBookStore';

export default function PhotoDetailPage() {
  const photoBookStore = usePhotoBookStore();

  const location = useLocation();

  const id = parseInt(location.pathname?.split('/')[3] || '', 10);

  useEffect(() => {
    photoBookStore.fetchPhoto(id);
  }, []);

  return ((
    <PhotoDetail id={id} />
  ));
}
