import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GuestBookDetail from '../components/guestBook/GuestBookDetail';
import useCommentStore from '../hooks/useCommentStore';
import useGuestBookStore from '../hooks/useGuestBookStore';

export default function GuestBookDetailPage() {
  const guestBookStore = useGuestBookStore();
  const commentStore = useCommentStore();

  const location = useLocation();

  const id = parseInt(location.pathname?.split('/')[3] || '', 10);
  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    guestBookStore.fetchGuestBook(id);
    commentStore.fetchComments(id);
  }, []);

  return ((
    <GuestBookDetail id={id} currentNickname={nickname} />
  ));
}
