import * as _ from 'lodash';
import * as isoFetch from 'isomorphic-fetch';
import getErrorCodeHandler from './errorCodes';
import Configuration from './configuration';

export default class Fetchable {
  baseUrl: string = ''
  f: any = null

  constructor(baseUrl = Configuration.apiRoot, fetcher = isoFetch) {
    if (!baseUrl || baseUrl === '') {
      throw new Error('baseUrl may not be empty');
    }
    this.baseUrl = baseUrl;
    this.f = fetcher;
  }

  request(verb: string, url: string, options: any= {}) {
    const opts = _.merge({}, options);
    opts.method = _(verb).toUpper();
    return this._fetch(url, this.prepare(opts));
  }

  get(url: string, options = {}) {
    return this.request('GET', url, options);
  }

  put(url: string, options = {}) {
    return this.request('PUT', url, options);
  }

  post(url: string, options = {}) {
    return this.request('POST', url, options);
  }

  patch(url: string, options = {}) {
    return this.request('PATCH', url, options);
  }

  delete(url: string, options = {}) {
    return this.request('DELETE', url, options);
  }

  search(url: string, options = {}) {
    return this.request('SEARCH', url, options);
  }

  deserialize(response: any) {
    if (response.ok) {
      return response.json().then((json: JSON) => {
        return {
          json,
          response
        };
      }).catch((e: Error) => {
        return {
          json: {},
          error: e,
          response
        };
      });
    } else {
      return {
        json: {},
        response
      };
    }
  }

  _fetch(url: string, options: object) {
    if (!url) {
      throw new Error('url may not be empty');
    }
    return this.f(this.baseUrl + url, options)
      .then((response: any) => this.deserialize(response))
      .then(({
        response,
        json
      }: any) => {
        getErrorCodeHandler(response)();
        return json;
      })
      .catch((e: Error) => getErrorCodeHandler(e)());
  }

  toForm(body: object) {
    const form = new FormData();
    _.each(body, (v: string, k: string) => {
      form.append(k, v);
    });
    return form;
  }

  toJson(body: object) {
    return JSON.stringify(body);
  }

  prepareXhr(xhr: XMLHttpRequest) {
    const defaults = {
      headers: {
        Accept: 'application/json',
        Authorization: `${Configuration.getAuthorizationHeader()}`
      }
    };

    xhr.withCredentials = false;
    _.each(defaults.headers, (v: string, k: string) => {
      xhr.setRequestHeader(k, v);
    });
  }

  prepare(options: any) {
    const defaults = {
      headers: {
        Accept: 'application/json',
        Authorization: `${Configuration.getAuthorizationHeader()}`
      }
    };
    options.headers = _.merge({}, defaults.headers, options.headers);
    options.credentials = Configuration.fetch.credentials || 'omit';
    options.mode = Configuration.fetch.mode || 'no-cors';

    return options;
  }
}
