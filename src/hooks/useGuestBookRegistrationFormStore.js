import { guestBookRegistrationFormStore } from '../stores/GuestBookRegistrationFormStore';
import useStore from './useStore';

export default function useGuestBookRegistrationFormStore() {
  return useStore(guestBookRegistrationFormStore);
}
