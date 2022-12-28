import { photoBookStore } from '../stores/PhotoBookStore';
import useStore from './useStore';

export default function usePhotoBookStore() {
  return useStore(photoBookStore);
}
