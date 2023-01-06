import ProfileStore from './ProfileStore';

const context = describe;

describe('ProfileStore', () => {
  let profileStore;

  beforeEach(() => {
    profileStore = new ProfileStore();
  });

  context('when fetch Profile', () => {
    it('set profile', async () => {
      await profileStore.fetchProfile('zzezze');

      expect(profileStore.nickname).toBeTruthy();
      expect(profileStore.profileImage).toBeTruthy();
      expect(profileStore.introduction).toBeTruthy();
    });
  });
});
