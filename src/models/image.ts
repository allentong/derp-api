import CrudApi from './base';
import Configuration from './configuration';

export default class Image extends CrudApi {
  private static _instance: Image;

  constructor() {
    super('image')

    if (!Image._instance) {
      Image._instance = new Image();
      return this;
    }
  }

  getImageUploadUrl(): string {
    return `${Configuration.apiRoot}/api/v1/images`;
  }

  imageUploadIntercept(file: string, xhr: XMLHttpRequest) {
    super.prepareXhr(xhr);
  }
}
