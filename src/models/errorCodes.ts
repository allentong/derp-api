import {
  FetchError
} from './errors';
import Configuration from './configuration';

import IKnownCodes from '../interfaces/IKnownCodes';

const knownCodes: IKnownCodes = {
  302: 'Redirect',
  400: 'Validation',
  401: 'Unauthorized',
  403: 'Forbidden',
  405: 'Not Implemented',
  500: 'Server Error',
};


/*
  Returns a function that handles the given error code.
  If there is no error, returns a NOOP-equivalent function.
 */
export default function getErrorCodeHandler(response = {}) {
  if (response instanceof Error) {
    return () => Configuration.globalErrorHandler(response, -1, 'Network error');
  }

  const {
    status
  }: any = response;
  const message = knownCodes[status];
  if (message) {
    return () => Configuration.globalErrorHandler(new FetchError(response, message), status, message);
  }

  return () => {};
}
