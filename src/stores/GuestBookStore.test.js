import GuestBookStore from './GuestBookStore';

const context = describe;

describe('UserStore', () => {
  let guestBookStore;

  beforeEach(() => {
    guestBookStore = new GuestBookStore();
  });

  context('when fetch guestBookList', () => {
    it('set guestBookList', async () => {
      await guestBookStore.fetchGuestBookList('zzezze');

      expect(guestBookStore.guestBookList).toBeTruthy();
    });
  });

  context('when fetch guestBook', () => {
    it('set guestBook', async () => {
      await guestBookStore.fetchGuestBook(1);

      expect(guestBookStore.guestBook).toBeTruthy();
    });
  });

  context('when create guestBook', () => {
    it('set guestBook', async () => {
      await guestBookStore.createGuestBook('zzezze', '사진 설명');

      expect(guestBookStore.guestBook).toBeTruthy();
    });
  });

  // context('when patch photo', () => {
  //   it('set photo', async () => {
  //     const formData = new FormData();

  //     await photoBookStore.editPhoto(1, formData, '사진 설명');

  //     expect(photoBookStore.photo).toBeTruthy();
  //   });
  // });
});
