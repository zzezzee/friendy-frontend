import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PhotoDetail from '../components/photoBook/PhotoDetail';
import useCommentStore from '../hooks/useCommentStore';
import usePhotoBookStore from '../hooks/usePhotoBookStore';
import useUserStore from '../hooks/useUserStore';
import Layout from '../layouts/Layout';

export default function PhotoDetailPage() {
  const photoBookStore = usePhotoBookStore();
  const commentStore = useCommentStore();
  const userStore = useUserStore();

  const location = useLocation();

  const id = parseInt(location.pathname?.split('/')[3] || '', 10);
  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    photoBookStore.fetchPhoto(id);
    commentStore.fetchComments(id);
    userStore.fetchUser(nickname);
  }, []);

  return ((
    <Layout header bottomNav>
      <PhotoDetail id={id} currentNickname={nickname} />
    </Layout>
  ));
}
