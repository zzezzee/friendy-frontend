import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import config from '../config';
import { chatApiService } from '../services/ChatApiService';
import { webSocketApiService } from '../services/WebSocketApiService';
import Store from './Store';

const baseURL = config.apiBaseURL;

export default class ChatStore extends Store {
  constructor() {
    super();

    this.chatRoomId = 0;
    this.chats = [];
    this.connected = false;

    this.messageToSend = '';

    this.status = '';
  }

  async fetchChats(chatRoomId) {
    try {
      const { chats } = await chatApiService.fetchChats(chatRoomId);

      this.chats = chats;

      this.changeStatus('successful');
    } catch (e) {
      this.changeStatus('failed');
    }
  }

  sendChat(nickname) {
    webSocketApiService.sendTextMessage({
      client: this.client,
      message: {
        chatRoomId: this.chatRoomId,
        nickname,
        content: this.messageToSend,
      },
    });
  }

  reset() {
    this.messageToSend = '';
  }

  connect({
    chatRoomId,
  }) {
    this.chatRoomId = chatRoomId;

    this.socket = new SockJS(`${baseURL}/ws`);
    this.client = Stomp.over(this.socket);
    this.client.connect(
      {},
      () => {
        this.client.subscribe(
          `/sub/chat-rooms/${this.chatRoomId}`,
          (messageReceived) => {
            this.receiveMessage(messageReceived);
          },
          {},
        );

        this.connected = true;
        this.publish();
      },
    );
  }

  receiveMessage(messageReceived) {
    const message = JSON.parse(messageReceived.body);
    this.chats = [...this.chats, message];

    this.publish();
  }

  disconnect() {
    this.client.unsubscribe();
    this.client.disconnect();

    this.connected = false;
    this.messageToSend = '';
    this.chats = [];

    this.publish();
  }

  changeMessageToSend(messageToSend) {
    this.messageToSend = messageToSend;

    this.publish();
  }

  changeStatus(status) {
    this.status = status;
    this.publish();
  }

  get isCallSuccessful() {
    return this.status === 'successful';
  }
}

export const chatStore = new ChatStore();
