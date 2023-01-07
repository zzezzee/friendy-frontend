import { photoBookApiService } from '../services/PhotoBookApiService';
import Store from './Store';

export default class PhotoBookStore extends Store {
  constructor() {
    super();

    this.photoBook = [];
    this.photo = {};
  }

  async fetchPhotoBook(nickname) {
    const { photos } = await photoBookApiService.fetchPhotoBook(nickname);

    this.photoBook = photos;

    this.publish();
  }

  async createPhoto(formData, explanation) {
    const image = await photoBookApiService.upload(formData);

    const { photo } = await photoBookApiService.create(image, explanation);

    this.photo = photo;

    this.publish();
  }

  async editPhoto(id, formData, explanation) {
    const image = await photoBookApiService.upload(formData);

    const { photo } = await photoBookApiService.patch(id, image, explanation);

    this.photo = photo;

    this.publish();
  }

  async deletePhoto(id) {
    await photoBookApiService.delete(id);

    this.publish();
  }
}

export const photoBookStore = new PhotoBookStore();
