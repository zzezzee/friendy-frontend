import axios from 'axios';
import config from '../config';

const baseURL = config.apiBaseURL;

export default class NotificationApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchNotifications() {
    const url = `${baseURL}/notifications`;

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

export const notificationApiService = new NotificationApiService();
