import { friendApiService } from '../services/FriendApiService';
import Store from './Store';

export default class FriendStore extends Store {
  constructor() {
    super();

    this.friends = [];
  }

  async fetchFriends(nickname) {
    const { users } = await friendApiService.fetchFriends(nickname);

    this.friends = users;

    this.publish();
  }
}

export const friendStore = new FriendStore();
