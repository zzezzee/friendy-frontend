import { commentApiService } from '../services/CommentApiService';
import Store from './Store';

export default class CommentStore extends Store {
  constructor() {
    super();

    this.comments = [];

    this.editCommentStatus = '';
  }

  async fetchComments(id) {
    const { comments } = await commentApiService.fetchComments(id);

    this.comments = comments;

    this.publish();
  }

  async createComment(content, id, postType) {
    await commentApiService.create(content, id, postType);

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
}

export const commentStore = new CommentStore();
