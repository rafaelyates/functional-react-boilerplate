/**
 * Following google's JSON style guide.
 * See more at: https://google.github.io/styleguide/jsoncstyleguide.xml
 */

/**
 * Represents the root received payload.
 */
export interface Payload<T> {
  readonly id: string;
  readonly data?: Data<T>;
  readonly error?: Error;
}

/**
 * In case of success, the requested data.
 */
export interface Data<T> {
  readonly id?: string;
  readonly items: ReadonlyArray<T>;
}

/**
 * In case of errors, the fail details.
 */
export interface Error {
  readonly code: number;
  readonly message: string;
  readonly errors?: ReadonlyArray<StackTrace>;
}

/**
 * The detailed error reason.
 */
export interface StackTrace {
  readonly reason: string;
  readonly message: string;
}
