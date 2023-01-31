import { chatRoomStore } from '../stores/ChatRoomStore';
import useStore from './useStore';

export default function useChatRoomStore() {
  return useStore(chatRoomStore);
}
