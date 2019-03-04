import { Middleware } from 'redux';
import { Action } from 'redux-actions';
import { createLogger, LogEntryObject } from 'redux-logger';

const isDevelopment: boolean = process.env.NODE_ENV === 'development';
const checkMiddlewareType: (value: string) => boolean = (value: string) => !/^\@\@/.test(value);

const logger: Middleware = createLogger({
  predicate: (state: unknown, action: Action<unknown>) => isDevelopment && checkMiddlewareType(action.type),
  collapsed: (state: unknown, action: Action<unknown>, entry?: LogEntryObject) => entry !== undefined && !entry.error
});

export { logger };
