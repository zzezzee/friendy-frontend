/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseURL = config.apiBaseURL;

export default class CommentApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async create(content, id) {
    const url = `${baseURL}/comments`;

    const { data } = await axios.post(
      url,
      {
        photoId: id,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    return data;
  }

  async delete(id) {
    const url = `${baseURL}/comments/${id}`;

    const { data } = await axios.delete(
      url,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    return data;
  }

  async patch(content, id) {
    const url = `${baseURL}/comments/${id}`;

    const { data } = await axios.patch(
      url,
      {
        content,
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

export const commentApiService = new CommentApiService();
