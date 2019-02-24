/**
 * Following google's JSON style guide.
 * See more at: https://google.github.io/styleguide/jsoncstyleguide.xml
 */

/**
 * Represents the root received payload.
 */
export interface IPayload<T> {
  readonly id: string;
  readonly data?: IData<T>;
  readonly error?: IError;
}

/**
 * In case of success, the requested data.
 */
export interface IData<T> {
  readonly id?: string;
  readonly items: ReadonlyArray<T>;
}

/**
 * In case of errors, the fail details.
 */
export interface IError {
  readonly code: number;
  readonly message: string;
  readonly errors?: ReadonlyArray<IStackTrace>;
}

/**
 * The detailed error reason.
 */
export interface IStackTrace {
  readonly reason: string;
  readonly message: string;
}
