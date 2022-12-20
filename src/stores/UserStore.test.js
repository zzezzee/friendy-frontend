import UserStore from './UserStore';

const context = describe;

describe('UserStore', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  context('when login', () => {
    it('set nickname', async () => {
      await userStore.login({
        username: 'username',
        password: 'Password123!',
      });

      expect(userStore.nickname).toBeTruthy();
    });
  });

  context('when login with unExistUsername', () => {
    it('nickname not exist', async () => {
      await userStore.login({
        username: 'unExistUsername',
        password: 'Password123!',
      });

      expect(userStore.nickname).toBeFalsy();
    });
  });

  context('when login with wrong password', () => {
    it('nickname not exist', async () => {
      await userStore.login({
        username: '12345',
        password: 'wrongPassword',
      });

      expect(userStore.nickname).toBeFalsy();
    });
  });
});
