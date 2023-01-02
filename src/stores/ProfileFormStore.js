import Store from './Store';

export default class ProfileFormStore extends Store {
  constructor() {
    super();
    this.profileImage = '';
    this.introduction = '';
  }

  changeProfileImage(profileImage) {
    this.profileImage = profileImage;

    this.publish();
  }

  changeIntroduction(introduction) {
    this.introduction = introduction;

    this.publish();
  }
}

export const profileFormStore = new ProfileFormStore();
