import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Notification from '../components/Notification';
import useNotificationStore from '../hooks/useNotificationStore';
import useUserStore from '../hooks/useUserStore';
import Layout from '../layouts/Layout';

export default function NotificationPage() {
  const userStore = useUserStore();
  const notificationStore = useNotificationStore();

  const location = useLocation();
  const nickname = location.pathname?.split('/')[1] || '';

  useEffect(() => {
    userStore.fetchUser(nickname);
    notificationStore.fetchNotifications();
  }, []);

  return ((
    <Layout header bottomNav>
      <Notification />
    </Layout>

  ));
}
