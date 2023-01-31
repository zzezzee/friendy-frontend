/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseURL = config.apiBaseURL;

export default class ChatRoomApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchChatRooms() {
    const url = `${baseURL}/chat-rooms`;

    const { data } = await axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    console.log(data);

    return data;
  }
}

export const chatRoomApiService = new ChatRoomApiService();
