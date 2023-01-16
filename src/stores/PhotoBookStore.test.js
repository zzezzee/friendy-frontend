import PhotoBookStore from './PhotoBookStore';

const context = describe;

describe('PostBookStore', () => {
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

  context('when fetch photo', () => {
    it('set photo', async () => {
      await photoBookStore.fetchPhoto(1);

      // expect(photoBookStore.photo).toBeTruthy();
      expect(photoBookStore.photo).toBeTruthy();
    });
  });

  context('when patch photo', () => {
    it('set photo', async () => {
      const formData = new FormData();

      await photoBookStore.editPhoto(1, formData, '사진 설명');

      expect(photoBookStore.photo).toBeTruthy();
    });
  });
});
