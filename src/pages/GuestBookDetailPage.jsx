import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GuestBookDetail from '../components/guestBook/GuestBookDetail';
import useCommentStore from '../hooks/useCommentStore';
import useGuestBookStore from '../hooks/useGuestBookStore';
import Layout from '../layouts/Layout';

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
    <Layout header bottomNav>
      <GuestBookDetail id={id} currentNickname={nickname} />
    </Layout>

  ));
}
