import ProfileFormStore from './ProfileFormStore';

const context = describe;

describe('ProfileFormStore', () => {
  let profileFormStore;

  beforeEach(() => {
    profileFormStore = new ProfileFormStore();
  });

  context('when change profileImage', () => {
    it('profileImage changed', () => {
      profileFormStore.changeProfileImage('profileImage');

      expect(profileFormStore.profileImage).toBe('profileImage');
    });
  });

  context('when change introduction', () => {
    it('introduction changed', () => {
      profileFormStore.changeIntroduction('introduction');

      expect(profileFormStore.introduction).toBe('introduction');
    });
  });
});
