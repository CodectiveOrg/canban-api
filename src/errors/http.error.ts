const status = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  413: "Content Too Large",
  415: "Unsupported Media Type",
  500: "OK",
} satisfies Record<number, string>;

type StatusCode = keyof typeof status;
type ReasonPhrase = (typeof status)[keyof typeof status];

export class HttpError {
  public reasonPhrase: ReasonPhrase;

  public constructor(
    public statusCode: StatusCode,
    public message: string,
  ) {
    this.reasonPhrase = status[statusCode];
  }
}
