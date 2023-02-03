import { chatRoomApiService } from '../services/ChatRoomApiService';
import Store from './Store';

export default class ChatRoomStore extends Store {
  constructor() {
    super();

    this.chatRooms = [];
    this.chatRoom = [];

    this.status = '';
  }

  async fetchChatRooms() {
    try {
      const { chatRooms } = await chatRoomApiService.fetchChatRooms();

      this.chatRooms = chatRooms;

      this.changeStatus('successful');
    } catch (e) {
      this.changeStatus('failed');
    }
  }

  changeStatus(status) {
    this.status = status;
    this.publish();
  }

  get isCallSuccessful() {
    return this.status === 'successful';
  }
}

export const chatRoomStore = new ChatRoomStore();
