export default interface apiTemplates {
  COUNT: apiTemplatesResult;
  CREATE: apiTemplatesResult;
  CREATE_MANY: apiTemplatesResult;
  DELETE: apiTemplatesResult;
  LIST: apiTemplatesResult;
  SAVE: apiTemplatesResult;
  SINGLE: apiTemplatesResult;
  TYPEAHEAD: apiTemplatesResult;
}

type apiTemplatesResult = (x: string) => {};
