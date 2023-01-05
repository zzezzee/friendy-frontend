import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GuestBookDetail from '../components/guestBook/GuestBookDetail';
import useGuestBookStore from '../hooks/useGuestBookStore';

export default function GuestBookDetailPage() {
  const guestBookStore = useGuestBookStore();

  const location = useLocation();

  const id = parseInt(location.pathname?.split('/')[3] || '', 10);

  useEffect(() => {
    guestBookStore.fetchGuestBook(id);
  }, []);

  return ((
    <GuestBookDetail />
  ));
}
