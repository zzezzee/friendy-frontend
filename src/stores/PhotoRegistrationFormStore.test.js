import PhotoRegistrationFormStore from './PhotoRegistrationFormStore';

const context = describe;

describe('PhotoRegistrationFormStore', () => {
  let photoRegistrationFormStore;

  beforeEach(() => {
    photoRegistrationFormStore = new PhotoRegistrationFormStore();
  });

  context('when change image', () => {
    it('image changed', () => {
      photoRegistrationFormStore.changeImage('profileImage');

      expect(photoRegistrationFormStore.image).toBe('profileImage');
    });
  });

  context('when change explanation', () => {
    it('explanation changed', () => {
      photoRegistrationFormStore.changeExplanation('explanation');

      expect(photoRegistrationFormStore.explanation).toBe('explanation');
    });
  });
});
