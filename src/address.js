// @flow
import CrudApi from './base';

let singleton : any = null;

export default class Address extends CrudApi {
  constructor() {
    super('address');

    if (singleton) {
      return singleton;
    }
    singleton = this;

    return singleton;
  }
}
