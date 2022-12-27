import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.nickname = '';
  }

  setNickname(nickname) {
    this.nickname = nickname;
    this.publish();
  }

  async fetchUser() {
    const { nickname } = await userApiService.fetchUser();

    this.nickname = nickname;

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
