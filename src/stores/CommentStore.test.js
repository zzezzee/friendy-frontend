import CommentStore from './CommentStore';

const context = describe;

describe('CommentStore', () => {
  let commentStore;

  beforeEach(() => {
    commentStore = new CommentStore();
  });

  context('when fetch comments', () => {
    it('set profile', async () => {
      await commentStore.fetchComments('zzezze');

      expect(commentStore.comments.length).toBeTruthy();
    });
  });

  context('when edit comment success', () => {
    it('editStatus successful', async () => {
      await commentStore.editComment('내용', 1);

      expect(commentStore.isEditCommentStatusSuccessful).toBeTruthy();
    });
  });
});
