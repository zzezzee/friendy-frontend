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

  async fetchComments(id) {
    const url = `${baseURL}/comments`;

    const { data } = await axios.get(
      url,
      {
        params: {
          id,
        },
      },
    );

    return data;
  }

  async create(content, id, postType) {
    const url = `${baseURL}/comments`;

    const { data } = await axios.post(
      url,
      {
        content,
        postId: id,
        postType,
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    return data;
  }

  async createReComment(content, id, postType, parentId) {
    const url = `${baseURL}/comments/reply`;

    const { data } = await axios.post(
      url,
      {
        content,
        postId: id,
        postType,
        parentId,
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
        id,
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
