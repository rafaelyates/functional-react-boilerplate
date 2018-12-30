import { ActionCreator } from 'redux';
import { Action } from 'redux-actions';

import { IPayload } from '@app/shared/models/payload.models';

/**
 * Helper type for {@link redux-action} action functions.
 */
declare type ActionFunction<T> = (parameter: T) => ActionCreator<void>;

/**
 * Helper type for {@link redux-action} reducer functions.
 */
declare type ReducerFunction<T> = (state: T, action: Action<IPayload<T>>) => T;

export { ActionFunction, ReducerFunction };
