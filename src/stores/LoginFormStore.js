import Store from './Store';

export default class LoginFormStore extends Store {
  constructor() {
    super();
    this.username = '';
    this.password = '';
    this.errors = '';
  }

  changeUsername(username) {
    this.username = username;

    this.publish();
  }

  changePassword(password) {
    this.password = password;

    this.publish();
  }

  validate() {
    this.errors = '';

    if (this.username === '') {
      this.errors = '아이디를 입력해주세요';
    }

    if (this.password === '') {
      this.errors = '비밀번호를 입력해주세요';
    }

    if (this.username === '' && this.password === '') {
      this.errors = '아이디와 비밀번호를 입력해주세요';
    }

    this.publish();
  }

  validateFailed() {
    return this.errors !== '';
  }
}

export const loginFormStore = new LoginFormStore();
