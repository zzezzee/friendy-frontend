import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class ProfileStore extends Store {
  constructor() {
    super();

    this.nickname = '';
    this.profileImage = '';
    this.introduction = '';
  }

  reset() {
    this.nickname = '';
    this.profileImage = '';
    this.introduction = '';

    this.publish();
  }

  async fetchProfile(miniHomepageOwner) {
    const {
      nickname, profileImage, introduction,
    } = await userApiService.fetchProfile(miniHomepageOwner);

    this.nickname = nickname;
    this.profileImage = profileImage;
    this.introduction = introduction;

    this.publish();
  }

  async patch(formData, explanation) {
    const profileImage = await userApiService.upload(formData);

    await userApiService.patch(profileImage, explanation);

    this.publish();
  }
}

export const profileStore = new ProfileStore();
