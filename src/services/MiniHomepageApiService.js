/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseURL = config.apiBaseURL;

export default class MiniHomepageApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchMiniHomepage(nickname) {
    const url = `${baseURL}/miniHomepages`;
    const { data } = await axios.get(url, {
      params: {
        nickname,
      },
    });

    return data;
  }
}

export const miniHomepageApiService = new MiniHomepageApiService();
