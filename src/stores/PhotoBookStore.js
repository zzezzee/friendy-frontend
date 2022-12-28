import { photoBookApiService } from '../services/PhotoBookApiService';
import Store from './Store';

export default class PhotoBookStore extends Store {
  constructor() {
    super();

    this.photoBook = [];
  }

  async fetchPhotoBook(nickname) {
    const { photos } = await photoBookApiService.fetchPhotoBook(nickname);

    this.photoBook = photos;

    this.publish();
  }
}

export const photoBookStore = new PhotoBookStore();
