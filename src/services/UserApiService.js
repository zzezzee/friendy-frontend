/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseURL = config.apiBaseURL;

export default class UserApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchUser() {
    const url = `${baseURL}/users/me`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async postSession({ username, password }) {
    const url = `${baseURL}/session`;
    const { data } = await axios.post(url, { username, password });

    return {
      accessToken: data.accessToken,
      nickname: data.nickname,
    };
  }
}

export const userApiService = new UserApiService();
