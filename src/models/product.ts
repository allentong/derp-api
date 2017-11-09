import CrudApi from './base';
import Configuration from './configuration';

export default class Product extends CrudApi {
  private static _instance: Product;

  constructor() {
    super('product', {
      SEARCH: (): string => '/api/v1/products/search',
      GET_ONE_WITH_SKU: (sku: string): string => `/api/v1/products/sku/${sku}`,
    });

    if (!Product._instance) {
      Product._instance = new Product();
      return this;
    }
  }

  singleBySku(sku: string, includeDeleted  = false): Promise<object> {
    return super
      .get(`${this.routes.GET_ONE_WITH_SKU(sku)}?includeDeleted=${includeDeleted.toString()}`)
      .then((json: any) => json.result);
  }

  imageUploadIntercept(file: any, xhr: XMLHttpRequest): void {
    super.prepareXhr(xhr);
  }

  getImageUploadUrl(id: number): string {
    if (id < 1) {
      throw new Error('id must be >= 1');
    }
    return `${Configuration.apiRoot}/api/v1/products/${id}/images`;
  }

  deleteImage(productId: number, id: number): Promise<object> {
    if (productId < 1) {
      throw new Error('productId must be >= 1');
    }
    if (id < 1) {
      throw new Error('id must be >= 1');
    }
    return super
      .request('DELETE', `/api/v1/products/${productId}/images/${id}`)
      .then(json => json.result);
  }
}
