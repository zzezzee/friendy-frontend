import Store from './Store';

export default class PhotoRegistrationFormStore extends Store {
  constructor() {
    super();
    this.image = '';
    this.explanation = '';
  }

  changeImage(image) {
    this.image = image;

    this.publish();
  }

  changeExplanation(explanation) {
    this.explanation = explanation;

    this.publish();
  }
}

export const photoRegistrationFormStore = new PhotoRegistrationFormStore();
