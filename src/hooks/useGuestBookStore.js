import { guestBookStore } from '../stores/GuestBookStore';
import useStore from './useStore';

export default function useGuestBookStore() {
  return useStore(guestBookStore);
}
