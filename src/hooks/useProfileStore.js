import { profileStore } from '../stores/ProfileStore';
import useStore from './useStore';

export default function useProfileStore() {
  return useStore(profileStore);
}
