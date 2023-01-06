/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseURL = config.apiBaseURL;

export default class GuestBookApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchGuestBookList(nickname) {
    const url = `${baseURL}/guest-books`;
    const { data } = await axios.get(url, {
      params: {
        nickname,
      },
    });

    return data;
  }

  async fetchGuestBook(id) {
    const url = `${baseURL}/guest-books/${id}`;
    const { data } = await axios.get(url);

    return data;
  }

  // async upload(formData) {
  //   const url = `${baseURL}/upload-photo`;
  //   const { data } = await axios.post(url, formData);

  //   return data;
  // }

  async create(nickname, content) {
    const url = `${baseURL}/guest-books`;

    const { data } = await axios.post(
      url,
      {
        nickname,
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

  // async patch(id, image, explanation) {
  //   const url = `${baseURL}/photo-books/${id}`;

  //   const { data } = await axios.patch(
  //     url,
  //     {
  //       id,
  //       image,
  //       explanation,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${this.accessToken}`,
  //       },
  //     },
  //   );

  //   return data;
  // }

  async delete(id) {
    const url = `${baseURL}/guest-books/${id}`;

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
}

export const guestBookApiService = new GuestBookApiService();
