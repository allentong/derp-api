// @flow
import CrudApi from './base';

let singleton : any = null;

export default class Sale extends CrudApi {
  constructor() {
    super('sale');

    if (singleton) {
      return singleton;
    }
    singleton = this;

    return singleton;
  }
}
