import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MiniHomepage from '../components/miniHomepage/MiniHomepage';
import useGuestBookStore from '../hooks/useGuestBookStore';
import useProfileStore from '../hooks/useProfileStore';
import usePhotoBookStore from '../hooks/usePhotoBookStore';
import useUserStore from '../hooks/useUserStore';
import useFriendStore from '../hooks/useFriendStore';

export default function MiniHomepagePage() {
  const userStore = useUserStore();
  const photoBookStore = usePhotoBookStore();
  const guestBookStore = useGuestBookStore();
  const profileStore = useProfileStore();
  const friendStore = useFriendStore();

  const location = useLocation();

  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    userStore.fetchUser(nickname);
    photoBookStore.fetchPhotoBook(nickname);
    guestBookStore.fetchGuestBookList(nickname);
    profileStore.fetchProfile(nickname);
    friendStore.fetchFriends(nickname);
  }, [nickname]);

  return ((
    <MiniHomepage />
  ));
}
