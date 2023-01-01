import { miniHomepageApiService } from '../services/MiniHomepageApiService';
import Store from './Store';

export default class MiniHomepageStore extends Store {
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

  async fetchMiniHomepage(owner) {
    const {
      nickname, profileImage, introduction,
    } = await miniHomepageApiService.fetchMiniHomepage(owner);

    this.nickname = nickname;
    this.profileImage = profileImage;
    this.introduction = introduction;

    this.publish();
  }

  async patch(formData, explanation) {
    const profileImage = await miniHomepageApiService.upload(formData);

    await miniHomepageApiService.patch(profileImage, explanation);

    this.publish();
  }
}

export const miniHomepageStore = new MiniHomepageStore();
