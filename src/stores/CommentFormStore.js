import Store from './Store';

export default class CommentFormStore extends Store {
  constructor() {
    super();
    this.content = '';
    this.replyNickname = '';
    this.editCommentId = '';
  }

  changeContent(content) {
    this.content = content;

    this.publish();
  }

  changeReplyNickname(replyNickname) {
    this.replyNickname = replyNickname;

    this.publish();
  }

  changeEditCommentId(editCommentId) {
    this.editCommentId = editCommentId;

    this.publish();
  }
}

export const commentFormStore = new CommentFormStore();
