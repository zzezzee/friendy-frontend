import FriendStore from './FriendStore';

const context = describe;

describe('FriendStore', () => {
  let friendStore;

  beforeEach(() => {
    friendStore = new FriendStore();
  });

  context('when fetch Profile', () => {
    it('set profile', async () => {
      await friendStore.fetchFriends('zzezze');

      expect(friendStore.friends).toBeTruthy();
    });
  });

  context('when fetch invitations', () => {
    it('set invites', async () => {
      await friendStore.fetchInvitations();

      expect(friendStore.invitationsReceived).toBeTruthy();
      expect(friendStore.invitationsSent).toBeTruthy();
    });
  });

  context('when cancel invitations', () => {
    it('set delete message', async () => {
      await friendStore.deleteInvitation(1, 'cancel');

      expect(friendStore.message).toEqual('Cancel invitation success');
    });
  });

  context('when refuse invitations', () => {
    it('set refuse message', async () => {
      await friendStore.deleteInvitation(1, 'refuse');

      expect(friendStore.message).toEqual('Refuse invitation success');
    });
  });
});
