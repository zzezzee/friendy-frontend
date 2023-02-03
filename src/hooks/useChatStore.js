import { chatStore } from '../stores/ChatStore';
import useStore from './useStore';

export default function useChatStore() {
  return useStore(chatStore);
}
