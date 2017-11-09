import CrudApi from './base';

export default class Category extends CrudApi {
  private static _instance: Category;

  constructor() {
    super('category');

    if (!Category._instance) {
      Category._instance = new Category();
      return this;
    }
  }
}
