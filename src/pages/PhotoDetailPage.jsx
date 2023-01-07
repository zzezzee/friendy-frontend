import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PhotoDetail from '../components/photoBook/PhotoDetail';
import usePhotoBookStore from '../hooks/usePhotoBookStore';

export default function PhotoDetailPage() {
  const photoBookStore = usePhotoBookStore();

  const location = useLocation();
  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    photoBookStore.fetchPhotoBook(nickname);
  }, []);

  return ((
    <PhotoDetail />
  ));
}
