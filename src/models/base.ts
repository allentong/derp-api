import * as _ from 'lodash';
import inflection from 'lodash-inflection';

import Constants from './constants';
import Fetchable from './fetchable';

_.mixin(inflection);

const t = Constants.apiTemplates;

export default class CrudApi extends Fetchable {
  routes: any;
  name: string;
  one: string;
  many: string;

  constructor(name: string, routes = {}) {
    super();

    this.routes = _.merge({}, t, routes);
    this.name = name;
    this.one = _(name).singularize().toLower();
    this.many = _(name).pluralize().toLower();
  }

  count(includeDeleted: boolean = false): Promise<object> {
    const body = new URLSearchParams();
    body.set('includeDeleted', includeDeleted.toString());

    return super
      .get(`${this.routes.COUNT(this.name)}?${body}`)
      .then((json: any) => json.result);
  }

  list(skip: number = 0, take: number = 25, includeDeleted: boolean = false): Promise<object> {
    const body = new URLSearchParams();
    body.set('skip', skip.toString());
    // body.set('take', take);
    body.set('includeDeleted', includeDeleted.toString());

    return super
      .get(`${this.routes.LIST(this.name)}?${body}`)
      .then((json: any) => json.result || json[this.many]);
  }

  single(id: number, includeDeleted: boolean = false): Promise<object> {
    const body = new URLSearchParams();
    body.set('includeDeleted', includeDeleted.toString());

    return super
      .get(`${this.routes.SINGLE(this.name)}/${id}?${body}`)
      .then((json: any) => json.result || json[this.one]);
  }

  typeahead(query: string, includeDeleted: boolean = false) {
    const body = new URLSearchParams();
    body.set('query', query);
    body.set('includeDeleted', includeDeleted.toString());

    return super
      .search(`${this.routes.TYPEAHEAD(this.name)}?${body}`)
      .then((json: any) => json.result);
  }

  save(thing: any) {
    const id = thing.id;
    const headers = {
      'Content-Type': 'application/json',
    };
    delete thing.id;

    return super
      .put(`${this.routes.SAVE(this.name)}/${id}`, {
        body: this.toJson(thing),
        headers
      })
      .then((json: any) => json.result || json[this.one]);
  }

  create(thing: any) {
    const headers = {
      'Content-Type': 'application/json',
    };
    delete thing.id;
    return super
      .post(this.routes.CREATE(this.name), {
        body: this.toJson(thing),
        headers
      })
      .then((json: any) => json.result || json[this.one]);
  }

  createMany(things: any) {
    const headers = {
      'Content-Type': 'application/json',
    };

    return super
      .post(this.routes.CREATE_MANY(this.name), {
        body: this.toJson({
          [this.many]: things
        }),
        headers
      })
      .then((json: any) => json.result || json[this.many]);
  }

  delete(id:number, rowVersion: number) {
    if (id < 1) {
      throw new Error('id must be >= 1');
    }
    if (rowVersion < 1) {
      throw new Error('rowVersion must be >= 1');
    }
    const body = new URLSearchParams();
    body.set('rowVersion', rowVersion.toString());
    return super
      .delete(`${this.routes.DELETE(this.name)}/${id}?${body}`)
      .then((json: any) => json.result || json[this.one]);
  }
}
