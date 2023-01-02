import { photoRegistrationFormStore } from '../stores/PhotoRegistrationFormStore';
import useStore from './useStore';

export default function usePhotoRegistrationFormStore() {
  return useStore(photoRegistrationFormStore);
}
