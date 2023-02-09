import { notificationStore } from '../stores/NotificationStore';
import useStore from './useStore';

export default function useNotificationStore() {
  return useStore(notificationStore);
}
