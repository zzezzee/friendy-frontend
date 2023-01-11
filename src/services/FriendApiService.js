/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseURL = config.apiBaseURL;

export default class FriendApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchFriends(nickname) {
    const url = `${baseURL}/relationship`;

    const { data } = await axios.get(
      url,
      {
        params: {
          nickname,
        },
      },
    );

    return data;
  }

  async fetchInvitations() {
    const url = `${baseURL}/invitations`;

    const { data } = await axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    return data;
  }
}

export const friendApiService = new FriendApiService();
