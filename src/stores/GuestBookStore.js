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

  async createGuestBook(nickname, content) {
    const guestBook = await guestBookApiService.create(nickname, content);

    this.guestBook = guestBook;

    this.publish();
  }

  async editGuestBook(content, id) {
    const guestBook = await guestBookApiService.patch(content, id);

    this.guestBook = guestBook;

    this.publish();
  }

  async deleteGuestBook(id) {
    await guestBookApiService.delete(id);

    this.publish();
  }
}

export const guestBookStore = new GuestBookStore();
