import { miniHomepageStore } from '../stores/MiniHomepageStore';
import useStore from './useStore';

export default function useMiniHomepageStore() {
  return useStore(miniHomepageStore);
}
