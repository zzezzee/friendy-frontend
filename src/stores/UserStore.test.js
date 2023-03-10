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
      expect(userStore.relationship).toBeFalsy();
    });
  });

  context('when login with wrong password', () => {
    it('nickname not exist', async () => {
      await userStore.login({
        username: '12345',
        password: 'wrongPassword',
      });

      expect(userStore.nickname).toBeFalsy();
      expect(userStore.relationship).toBeFalsy();
    });
  });

  context('when fetch User', () => {
    it('nickname exist', async () => {
      await userStore.fetchUser('zzezze');

      expect(userStore.nickname).toBeTruthy();
      expect(userStore.relationship).toBeTruthy();
    });
  });

  context('when fetch Users', () => {
    it('nickname exist', async () => {
      await userStore.fetchUsers();

      expect(userStore.users).toBeTruthy();
    });
  });
});
