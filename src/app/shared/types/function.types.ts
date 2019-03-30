import { ActionCreator } from 'redux';
import { Action } from 'redux-actions';

import { Payload } from '@app/shared/models/payload.models';

/**
 * Helper type for {@link redux-action} action functions.
 */
export declare type ActionFunction<T> = (parameter: T) => ActionCreator<void>;

/**
 * Helper type for {@link redux-action} reducer functions.
 */
export declare type ReducerFunction<T> = (state: T, action: Action<Payload<T>>) => T;
