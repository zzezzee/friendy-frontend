import MiniHomepageStore from './MiniHomepageStore';

const context = describe;

describe('MiniHomepageStore', () => {
  let miniHomepageStore;

  beforeEach(() => {
    miniHomepageStore = new MiniHomepageStore();
  });

  context('when fetch MiniHomepage', () => {
    it('set miniHomepage', async () => {
      await miniHomepageStore.fetchMiniHomepage();

      expect(miniHomepageStore.nickname).toBeTruthy();
      expect(miniHomepageStore.profileImage).toBeTruthy();
      expect(miniHomepageStore.introduction).toBeTruthy();
    });
  });

  context('when reset MiniHomepage', () => {
    it('set miniHomepage information blank', async () => {
      await miniHomepageStore.fetchMiniHomepage();

      miniHomepageStore.reset();

      expect(miniHomepageStore.nickname).toBeFalsy();
      expect(miniHomepageStore.profileImage).toBeFalsy();
      expect(miniHomepageStore.introduction).toBeFalsy();
    });
  });
});
