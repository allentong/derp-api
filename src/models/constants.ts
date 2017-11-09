import * as _ from 'lodash';
import inflection from 'lodash-inflection';

import IConstants from '../interfaces/IConstants';

_.mixin(inflection);

const constants: IConstants = {
  apiTemplates: {
    COUNT: (x: string): string => `/api/v1/${_(x).pluralize().toLower()}/count`,
    CREATE: (x: string): string => `/api/v1/${_(x).pluralize().toLower()}`,
    CREATE_MANY: (x: string): string => `/api/v1/${_(x).pluralize().toLower()}/import`,
    DELETE: (x: string): string => `/api/v1/${_(x).pluralize().toLower()}`,
    LIST: (x: string): string => `/api/v1/${_(x).pluralize().toLower()}`,
    SAVE: (x: string): string => `/api/v1/${_(x).pluralize().toLower()}`,
    SINGLE: (x:string): string => `/api/v1/${_(x).pluralize().toLower()}`,
    TYPEAHEAD: (x: string): string => `/api/v1/${_(x).pluralize().toLower()}/typeahead`,
  },

  add(name: string): void {
    if (constants[name]) {
      throw new Error(`Adding ${name} would overwrite existing constant.`);
    }
    constants[name] = name;
  },
};

export default constants;
