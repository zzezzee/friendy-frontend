import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PhotoDetail from '../components/photoBook/PhotoDetail';
import usePhotoBookStore from '../hooks/usePhotoBookStore';
import useUserStore from '../hooks/useUserStore';

export default function PhotoDetailPage() {
  const photoBookStore = usePhotoBookStore();
  const userStore = useUserStore();

  const location = useLocation();

  const id = location.pathname?.split('/')[3] || '';
  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    photoBookStore.fetchPhoto(id);
    userStore.fetchUser(nickname);
  }, []);

  return ((
    <PhotoDetail id={id} />
  ));
}
