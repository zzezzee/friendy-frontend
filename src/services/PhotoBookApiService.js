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
}

export const photoBookApiService = new PhotoBookApiService();
