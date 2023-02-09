import { commentApiService } from '../services/CommentApiService';
import Store from './Store';

export default class CommentStore extends Store {
  constructor() {
    super();

    this.comments = [];

    this.editCommentStatus = '';
    this.fetchCommentsStatus = '';
  }

  async fetchComments(id) {
    try {
      const { comments } = await commentApiService.fetchComments(id);

      this.comments = comments;

      this.changeFetchCommentsStatus('successful');
    } catch (e) {
      this.changeFetchCommentsStatus('failed');
    }
  }

  async createComment(content, id, postType, miniHomepageOwner) {
    await commentApiService.create(content, id, postType, miniHomepageOwner);

    this.publish();
  }

  async createReComment(content, id, postType, parentId) {
    await commentApiService.createReComment(content, id, postType, parentId);

    this.publish();
  }

  async deleteComment(id) {
    await commentApiService.delete(id);

    this.publish();
  }

  async editComment(content, id) {
    try {
      await commentApiService.patch(content, id);

      this.changeEditCommentStatus('successful');
    } catch (e) {
      this.changeEditCommentStatus('failed');
    }
  }

  changeEditCommentStatus(status) {
    this.editCommentStatus = status;
    this.publish();
  }

  changeFetchCommentsStatus(status) {
    this.fetchCommentStatus = status;
    this.publish();
  }

  get isEditCommentStatusSuccessful() {
    return this.editCommentStatus === 'successful';
  }
}

export const commentStore = new CommentStore();
