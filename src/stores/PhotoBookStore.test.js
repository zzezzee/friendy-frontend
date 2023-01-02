import PhotoBookStore from './PhotoBookStore';

const context = describe;

describe('UserStore', () => {
  let photoBookStore;

  beforeEach(() => {
    photoBookStore = new PhotoBookStore();
  });

  context('when fetch photos', () => {
    it('set photos', async () => {
      await photoBookStore.fetchPhotoBook('zzezze');

      expect(photoBookStore.photoBook).toBeTruthy();
    });
  });

  context('when create photo', () => {
    it('set photo', async () => {
      const formData = new FormData();

      await photoBookStore.createPhoto(formData, '사진 설명');

      expect(photoBookStore.photo).toBeTruthy();
    });
  });
});
