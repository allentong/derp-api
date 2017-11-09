import CrudApi from './base';

export default class Location extends CrudApi {
  private static _instance: Location;

  constructor() {
    super('location');

    if (!Location._instance) {
      Location._instance = new Location();
      return this;
    }
  }
}
