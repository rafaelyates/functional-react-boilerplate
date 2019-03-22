import { Middleware } from 'redux';
import { Action } from 'redux-actions';
import { createLogger, LogEntryObject } from 'redux-logger';

const isDevelopment: boolean = process.env.NODE_ENV === 'development';
const middlewareRegexp: RegExp = /^\@\@/;

const logger: Middleware = createLogger({
  predicate: (state: unknown, action: Action<unknown>) => isDevelopment && !middlewareRegexp.test(action.type),
  collapsed: (state: unknown, action: Action<unknown>, entry?: LogEntryObject) => !!entry && !entry.error,
});

export { logger };
