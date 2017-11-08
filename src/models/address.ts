import CrudApi from './base';

export default class Address extends CrudApi {
  private static _instance: Address;

  constructor() {
    super('address')

    if (!Address._instance) {
      Address._instance = new Address();
      return this;
    }
  }
}
