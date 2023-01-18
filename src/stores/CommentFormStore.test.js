import CommentFormStore from './CommentFormStore';

const context = describe;

describe('ProfileFormStore', () => {
  let commentFormStore;

  beforeEach(() => {
    commentFormStore = new CommentFormStore();
  });

  context('when change content', () => {
    it('content changed', () => {
      commentFormStore.changeContent('content');

      expect(commentFormStore.content).toBe('content');
    });
  });

  context('when change replyNickname', () => {
    it('replyNickname changed', () => {
      commentFormStore.changeReplyNickname('replyNickname');

      expect(commentFormStore.replyNickname).toBe('replyNickname');
    });
  });
});
