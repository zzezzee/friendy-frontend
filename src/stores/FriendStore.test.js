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
});
