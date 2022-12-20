import LoginFormStore from './LoginFormStore';

const context = describe;

describe('LoginFormStore', () => {
  let loginFormStore;

  beforeEach(() => {
    loginFormStore = new LoginFormStore();
  });

  context('when change username', () => {
    it('username changes', () => {
      loginFormStore.changeUsername('username');

      expect(loginFormStore.username).toBe('username');
    });
  });

  context('when change password', () => {
    it('password changes', () => {
      loginFormStore.changePassword('password');

      expect(loginFormStore.password).toBe('password');
    });
  });

  context('when login with blank username', () => {
    it('change errors', () => {
      loginFormStore.changeUsername('');
      loginFormStore.changePassword('password');

      loginFormStore.validate();

      expect(loginFormStore.errors).toBeTruthy();
    });
  });

  context('when login with blank password', () => {
    it('change errors', () => {
      loginFormStore.changeUsername('username');
      loginFormStore.changePassword('');

      loginFormStore.validate();

      expect(loginFormStore.errors).toBeTruthy();
    });
  });

  context('when login with blank username and password', () => {
    it('change errors', () => {
      loginFormStore.changeUsername('');
      loginFormStore.changePassword('');

      loginFormStore.validate();

      expect(loginFormStore.errors).toBeTruthy();
    });
  });

  context('when login success', () => {
    it('change errors', () => {
      loginFormStore.changeUsername('testUsername');
      loginFormStore.changePassword('testPassword123!');

      loginFormStore.validate();

      expect(loginFormStore.errors).toBeFalsy();
    });
  });
});
