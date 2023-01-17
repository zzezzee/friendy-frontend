import CommentFormStore from './CommentFormStore';

const context = describe;

describe('ProfileFormStore', () => {
  let commentFormStore;

  beforeEach(() => {
    commentFormStore = new CommentFormStore();
  });

  context('when change comment', () => {
    it('comment changed', () => {
      commentFormStore.changeComment('comment');

      expect(commentFormStore.comment).toBe('comment');
    });
  });
});
