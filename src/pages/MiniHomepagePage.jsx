import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MiniHomepage from '../components/MiniHomepage';
import useMiniHomepageStore from '../hooks/useMiniHomepageStore';

export default function MiniHomepagePage() {
  const location = useLocation();

  const miniHomepageStore = useMiniHomepageStore();

  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    miniHomepageStore.fetchMiniHomepage(nickname);
  }, []);

  return ((
    <MiniHomepage />
  ));
}
