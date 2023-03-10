/* eslint-disable no-unused-expressions */
import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.nickname = '';
    this.relationship = '';

    this.users = [];

    this.filteredUsers = [];
    this.searching = false;
  }

  reset() {
    this.nickname = '';

    this.publish();
  }

  setNickname(nickname) {
    this.nickname = nickname;

    this.publish();
  }

  async fetchUser(currentNickname) {
    const { nickname, relationship } = await userApiService.fetchUser(currentNickname);

    this.nickname = nickname;
    this.relationship = relationship;

    this.publish();
  }

  async fetchUsers() {
    const { users } = await userApiService.fetchUsers();

    this.users = users;

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

  filterUsersWithNickname(nickname) {
    nickname.length === 0
      ? this.searching = false
      : this.searching = true;

    this.filteredUsers = this.users.filter((user) => (
      user.nickname.includes(nickname)
    ));

    this.publish();
    console.log(this.searching);
  }
}

export const userStore = new UserStore();
