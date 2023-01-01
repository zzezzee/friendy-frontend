import { profileFormStore } from '../stores/ProfileFormStore';
import useStore from './useStore';

export default function useProfileFormStore() {
  return useStore(profileFormStore);
}
