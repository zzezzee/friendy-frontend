import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.nickname = '';
  }

  async fetchUser() {
    const { amount } = await userApiService.fetchUser();

    this.amount = amount;

    this.publish();
  }

  async login({ username, password }) {
    try {
      const { accessToken, nickname } = await userApiService.postSession({
        username, password,
      });

      this.nickname = nickname;

      return accessToken;
    } catch (e) {
      return '';
    }
  }
}

export const userStore = new UserStore();
