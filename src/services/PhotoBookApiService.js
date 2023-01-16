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
    const url = `${baseURL}/photos`;
    const { data } = await axios.get(url, {
      params: {
        nickname,
      },
    });

    return data;
  }

  async fetchPhoto(id) {
    const url = `${baseURL}/photos/${id}`;

    const { data } = await axios.get(url);

    return data;
  }

  async upload(formData) {
    const url = `${baseURL}/photos/upload`;
    const { data } = await axios.post(url, formData);

    return data;
  }

  async create(image, explanation) {
    const url = `${baseURL}/photos`;

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

  async patch(id, image, explanation) {
    const url = `${baseURL}/photos/${id}`;

    const { data } = await axios.patch(
      url,
      {
        id,
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
    const url = `${baseURL}/photos/${id}`;

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
