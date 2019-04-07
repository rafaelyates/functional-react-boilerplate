import { Middleware } from 'redux';
import { Action } from 'redux-actions';
import { createLogger, LogEntryObject } from 'redux-logger';

import { environment } from '@conf/environment.config';

const isDevelopment: boolean = environment.NODE_ENV === 'development';
const middlewareRegexp: RegExp = /(^\@\@)|(^persist\/)/;

const logger: Middleware = createLogger({
  predicate: (state: unknown, action: Action<unknown>) => isDevelopment && !middlewareRegexp.test(action.type),
  collapsed: (state: unknown, action: Action<unknown>, entry?: LogEntryObject) => !!entry && !entry.error,
});

export { logger };
