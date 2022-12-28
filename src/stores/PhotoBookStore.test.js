import { waitFor } from '@testing-library/react';
import PhotoBookStore from './PhotoBookStore';

const context = describe;

describe('UserStore', () => {
  let photoBookStore;

  beforeEach(() => {
    photoBookStore = new PhotoBookStore();
  });

  context('when fetch photos', () => {
    it('set photos', async () => {
      await photoBookStore.fetchPhotoBook();

      await waitFor(() => {
        expect(photoBookStore.photoBook).toBeTruthy();
      });
    });
  });
});
