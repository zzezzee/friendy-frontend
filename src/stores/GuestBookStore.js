import { guestBookApiService } from '../services/GuestBookApiService';
import Store from './Store';

export default class GuestBookStore extends Store {
  constructor() {
    super();

    this.guestBookList = [];
    this.guestBook = {};
  }

  async fetchGuestBookList(nickname) {
    const { guestBooks } = await guestBookApiService.fetchGuestBookList(nickname);

    this.guestBookList = guestBooks;

    this.publish();
  }

  async fetchGuestBook(id) {
    const guestBook = await guestBookApiService.fetchGuestBook(id);

    this.guestBook = guestBook;

    this.publish();
  }

  // async createPhoto(formData, explanation) {
  //   const image = await photoBookApiService.upload(formData);

  //   const { photo } = await photoBookApiService.create(image, explanation);

  //   this.photo = photo;

  //   this.publish();
  // }

  // async editPhoto(id, formData, explanation) {
  //   const image = await photoBookApiService.upload(formData);

  //   const { photo } = await photoBookApiService.patch(id, image, explanation);

  //   this.photo = photo;

  //   this.publish();
  // }

  // async deletePhoto(id) {
  //   await photoBookApiService.delete(id);

  //   this.publish();
  // }
}

export const guestBookStore = new GuestBookStore();
