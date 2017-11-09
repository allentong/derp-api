import CrudApi from './base';

export default class Customer extends CrudApi {
  private static _instance: Customer;

  constructor() {
    super('customer');

    if (!Customer._instance) {
      Customer._instance = new Customer();
      return this;
    }
  }
}
