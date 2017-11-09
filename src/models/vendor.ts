import CrudApi from './base';

export default class Vendor extends CrudApi {
  private static _instance: Vendor;

  constructor() {
    super('vendor');

    if (!Vendor._instance) {
      Vendor._instance = new Vendor();
      return this;
    }
  }
}
