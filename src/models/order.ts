import * as _ from 'lodash';
import inflection from 'lodash-inflection';

import CrudApi from './base';

_.mixin(inflection);

export default class Order extends CrudApi {
  private static _instance: Order;

  constructor(routes: any = {}) {
    super('order', _.merge({}, {
      CAPTURE_BILLING: (x: string, id: number): string => `/api/v1/${_(x).pluralize().toLower()}/${id}/billing`,
      UPDATE_STATUS: (x: string, id: number, status: string): string => `/api/v1/${_(x).pluralize().toLower()}/${id}/${status}`,
      GET_ORDER_BY_KEY: (x: string, id: number, key: string): string => `/api/v1/${_(x).pluralize().toLower()}/summary/${key}/${id}`,
    }, routes));

    if (!Order._instance) {
      Order._instance = new Order();
      return this;
    }
  }

  captureBilling({
    id
  }: any, token: string): Promise<object> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return super
      .post(this.routes.CAPTURE_BILLING(this.name, id), {
        body: this.toJson({
          token
        }),
        headers
      })
      .then((json: any) => json.result || json[this.one]);
  }

  getByKey({
    id,
    key
  }: any): Promise<object> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return super
      .get(this.routes.GET_ORDER_BY_KEY(this.name, id, key), {
        headers
      })
      .then((json: any) => json.result || json[this.one]);
  }

  updateStatus({
    id
  }: any, status: string): Promise<object> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return super
      .post(this.routes.UPDATE_STATUS(this.name, id, status), {
        headers
      })
      .then((json: any) => json.result || json[this.one]);
  }
}
