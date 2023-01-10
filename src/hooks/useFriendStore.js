import { friendStore } from '../stores/FriendStore';
import useStore from './useStore';

export default function useFriendStore() {
  return useStore(friendStore);
}
