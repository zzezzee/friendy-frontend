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

  async postSession({ username, password }) {
    const url = `${baseURL}/session`;
    const { data } = await axios.post(url, { username, password });

    return {
      accessToken: data.accessToken,
      nickname: data.nickname,
    };
  }

  async fetchUser(currentNickname) {
    const url = `${baseURL}/users/me`;
    const { data } = await axios.get(
      url,
      {
        params: {
          currentNickname,
        },
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    return data;
  }

  async fetchUsers() {
    const url = `${baseURL}/users`;
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

  async fetchProfile(nickname) {
    const url = `${baseURL}/users/profile`;
    const { data } = await axios.get(url, {
      params: {
        nickname,
      },
    });

    return data;
  }

  async upload(formData) {
    const url = `${baseURL}/users/upload-image`;
    const { data } = await axios.post(url, formData);

    return data;
  }

  async patch(profileImage, introduction) {
    const url = `${baseURL}/users`;

    const { data } = await axios.patch(
      url,
      {
        profileImage,
        introduction,
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    return data;
  }
}

export const userApiService = new UserApiService();
