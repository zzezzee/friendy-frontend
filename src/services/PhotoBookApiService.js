/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseURL = config.apiBaseURL;

export default class PhotoBookApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchPhotoBook(nickname) {
    const url = `${baseURL}/photo-books`;
    const { data } = await axios.get(url, {
      params: {
        nickname,
      },
    });

    return data;
  }

  async upload(formData) {
    const url = `${baseURL}/upload-photo`;
    const { data } = await axios.post(url, formData);

    return data;
  }

  async create(image, explanation) {
    const url = `${baseURL}/photo-books`;

    const { data } = await axios.post(
      url,
      {
        image,
        explanation,
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
    const url = `${baseURL}/photo-books/${id}`;

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

export const photoBookApiService = new PhotoBookApiService();
