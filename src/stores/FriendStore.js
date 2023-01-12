import { friendApiService } from '../services/FriendApiService';
import Store from './Store';

export default class FriendStore extends Store {
  constructor() {
    super();

    this.friends = [];

    this.invitationsReceived = [];
    this.invitationsSent = [];

    this.message = '';
  }

  async fetchFriends(nickname) {
    const { users } = await friendApiService.fetchFriends(nickname);

    this.friends = users;

    this.publish();
  }

  async fetchInvitations() {
    const { invitationsReceived, invitationsSent } = await friendApiService.fetchInvitations();

    this.invitationsReceived = invitationsReceived;
    this.invitationsSent = invitationsSent;

    this.publish();
  }

  async deleteInvitation(id, type) {
    if (type === 'cancel') {
      this.invitationsSent = this.invitationsSent.filter((e) => e.id !== id);
    }
    if (type === 'refuse') {
      this.invitationsReceived = this.invitationsReceived.filter((e) => e.id !== id);
    }
    if (type === 'accept') {
      this.invitationsReceived = this.invitationsReceived.filter((e) => e.id !== id);
    }

    const message = await friendApiService.deleteInvitation(id, type);

    this.message = message;

    this.publish();
  }
}

export const friendStore = new FriendStore();
