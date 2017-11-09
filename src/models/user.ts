import CrudApi from './base';

export default class User extends CrudApi {
  private static _instance: User;

  constructor() {
    super('user');

    if (!User._instance) {
      User._instance = new User();
      return this;
    }
  }

  typeahead(query: string, includeDeleted: boolean = false) {
    const body  = new URLSearchParams();
    body.set('query', query);
    body.set('includeDeleted', includeDeleted.toString());

    return super
      .get(`${this.routes.TYPEAHEAD(this.name)}?${body}`)
      .then((json: any) => json.result);
  }
}
