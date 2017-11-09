import CrudApi from './base';

export default class Warehouse extends CrudApi {
  private static _instance: Warehouse;

  constructor() {
    super('warehouse');

    if (!Warehouse._instance) {
      Warehouse._instance = new Warehouse();
      return this;
    }
  }
}
