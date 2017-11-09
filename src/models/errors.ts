export class FetchError extends Error {
  constructor({
    statusCode,
    body,
    contentType
  }: any, message: string, fileName: string, lineNumber: string) {
    super(message, fileName, lineNumber);
    this.statusCode = statusCode;
    this.body = body;
    this.contentType = contentType;
  }

  field(x: string) {
    let val;
    if (this.isJson() && this.hasBody()) {
      val = this.body.responseStatus[x];
    }
    return val;
  }

  get isJson(): boolean {
    return this.contentType === 'application/json';
  }

  get hasBody() {
    return !!this.body && this.body.responseStatus;
  }

  get statusDescription() {
    return this.field('statusDescription');
  }

  get errorCode() {
    return this.field('errorCode');
  }

  get errorMessage() {
    return this.field('errorMessage');
  }

  get responseDto() {
    return this.field('responseDto');
  }

  get responseStatus() {
    return this.field('responseStatus');
  }
}

export default {};
