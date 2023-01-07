import GuestBookRegistrationFormStore from './GuestBookRegistrationFormStore';

const context = describe;

describe('PhotoRegistrationFormStore', () => {
  let guestBookRegistrationFormStore;

  beforeEach(() => {
    guestBookRegistrationFormStore = new GuestBookRegistrationFormStore();
  });

  context('when change content', () => {
    it('content changed', () => {
      guestBookRegistrationFormStore.changeContent('content');

      expect(guestBookRegistrationFormStore.content).toBe('content');
    });
  });
});
