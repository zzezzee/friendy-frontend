import axios from 'axios';
import config from '../config';

const baseURL = config.apiBaseURL;

export default class ChatApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchChats(chatRoomId) {
    const url = `${baseURL}/chats`;

    const { data } = await axios.get(
      url,
      {
        params: {
          chatRoomId,
        },
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    return data;
  }
}

export const chatApiService = new ChatApiService();
