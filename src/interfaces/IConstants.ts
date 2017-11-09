import apiTemplates from './IApiTemplates';

export default interface IConstants {
  apiTemplates: apiTemplates;
  add: addConstants;
  [key: string]: any;
}

type addConstants = (name: string) => void;
