import { ActionCreator } from 'redux';
import { Action } from 'redux-actions';

import { Payload } from '@app/shared/models/payload.models';

/**
 * Helper type for react render callback.
 */
export declare type ReactRenderCallback = () => void | undefined;

/**
 * Helper type for registering service worker.
 */
export declare type RegisterServiceWorker = () => Promise<ServiceWorkerRegistration>;

/**
 * Helper type for {@link redux-action} action functions.
 */
export declare type ActionFunction<T> = (parameter: T) => ActionCreator<void>;

/**
 * Helper type for {@link redux-action} reducer functions.
 */
export declare type ReducerFunction<T> = (state: T, action: Action<Payload<T>>) => T;
