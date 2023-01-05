import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MiniHomepage from '../components/MiniHomepage';
import useGuestBookStore from '../hooks/useGuestBookStore';
import useMiniHomepageStore from '../hooks/useMiniHomepageStore';
import usePhotoBookStore from '../hooks/usePhotoBookStore';
import useUserStore from '../hooks/useUserStore';

export default function MiniHomepagePage() {
  const userStore = useUserStore();
  const photoBookStore = usePhotoBookStore();
  const guestBookStore = useGuestBookStore();

  const location = useLocation();

  const miniHomepageStore = useMiniHomepageStore();

  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    userStore.fetchUser();
    photoBookStore.fetchPhotoBook(nickname);
    guestBookStore.fetchGuestBookList(nickname);
    miniHomepageStore.fetchMiniHomepage(nickname);
  }, []);

  return ((
    <MiniHomepage />
  ));
}
