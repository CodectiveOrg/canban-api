const status = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  413: "Content Too Large",
  415: "Unsupported Media Type",
  500: "OK",
} satisfies Record<number, string>;

type StatusCode = keyof typeof status;
type ReasonPhrase = (typeof status)[keyof typeof status];

export class HttpError {
  public statusCode: StatusCode;
  public reasonPhrase: ReasonPhrase;
  public message: string;

  public constructor(statusCode: StatusCode, message?: string) {
    this.statusCode = statusCode;
    this.reasonPhrase = status[this.statusCode];
    this.message = message ?? this.reasonPhrase;
  }
}
