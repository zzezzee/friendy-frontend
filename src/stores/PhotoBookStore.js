import { commentApiService } from '../services/CommentApiService';
import { photoBookApiService } from '../services/PhotoBookApiService';
import Store from './Store';

export default class PhotoBookStore extends Store {
  constructor() {
    super();

    this.photoBook = null;
    this.photo = null;
    this.likes = [];

    this.friendsPhotos = null;

    this.comments = [];
    this.comment = {};
  }

  async fetchPhotoBook(nickname) {
    const { photos } = await photoBookApiService.fetchPhotoBook(nickname);

    this.photoBook = photos;

    this.publish();
  }

  async fetchPhoto(id) {
    const { photo, likes } = await photoBookApiService.fetchPhoto(id);

    this.photo = photo;
    this.likes = likes;

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

  async fetchFriendsPhotos() {
    const { friendsPhotos } = await photoBookApiService.fetchFriendsPhotos();

    friendsPhotos.sort((a, b) => b.photo.createdAt.localeCompare(a.photo.createdAt));

    this.friendsPhotos = friendsPhotos;

    this.publish();
  }

  async deletePhoto(id) {
    await photoBookApiService.delete(id);

    this.publish();
  }

  async likePhoto(id) {
    await photoBookApiService.patchLike(id);

    this.publish();
  }

  async createComment(content, id) {
    await commentApiService.create(content, id);

    this.publish();
  }

  async deleteComment(id) {
    await commentApiService.delete(id);

    this.publish();
  }

  async editComment(content, id) {
    await commentApiService.patch(content, id);

    this.publish();
  }
}

export const photoBookStore = new PhotoBookStore();
