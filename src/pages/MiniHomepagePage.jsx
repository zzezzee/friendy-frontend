import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MiniHomepage from '../components/MiniHomepage';
import useGuestBookStore from '../hooks/useGuestBookStore';
import useProfileStore from '../hooks/useProfileStore';
import usePhotoBookStore from '../hooks/usePhotoBookStore';
import useUserStore from '../hooks/useUserStore';

export default function MiniHomepagePage() {
  const userStore = useUserStore();
  const photoBookStore = usePhotoBookStore();
  const guestBookStore = useGuestBookStore();

  const location = useLocation();

  const profileStore = useProfileStore();

  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    userStore.fetchUser();
    photoBookStore.fetchPhotoBook(nickname);
    guestBookStore.fetchGuestBookList(nickname);
    profileStore.fetchProfile(nickname);
  }, []);

  return ((
    <MiniHomepage />
  ));
}
