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

  async deleteAll() {
    const url = `${baseURL}/notifications`;

    await axios.delete(
      url,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );
  }

  async deleteAllChecked() {
    const url = `${baseURL}/notifications/checked`;

    await axios.delete(
      url,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );
  }

  async delete(id) {
    const url = `${baseURL}/notifications/${id}`;

    await axios.delete(
      url,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );
  }

  async checkAll() {
    const url = `${baseURL}/notifications`;

    await axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );
  }

  async check(id) {
    const url = `${baseURL}/notifications/${id}`;

    await axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );
  }
}

export const notificationApiService = new NotificationApiService();
