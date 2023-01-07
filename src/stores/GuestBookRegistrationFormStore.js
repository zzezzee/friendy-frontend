import Store from './Store';

export default class GuestBookRegistrationFormStore extends Store {
  constructor() {
    super();
    this.content = '';
  }

  changeContent(content) {
    this.content = content;

    this.publish();
  }
}

export const guestBookRegistrationFormStore = new GuestBookRegistrationFormStore();
