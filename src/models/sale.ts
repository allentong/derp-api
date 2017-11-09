import CrudApi from './base';

export default class Sale extends CrudApi {
  private static _instance: Sale;

  constructor() {
    super('sale');

    if (!Sale._instance) {
      Sale._instance = new Sale();
      return this;
    }
  }
}
