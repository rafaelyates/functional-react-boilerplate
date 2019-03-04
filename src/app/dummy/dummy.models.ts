import { ChangeEvent } from 'react';

import { ActionCreator } from 'redux';

import { IPayload } from '@app/shared/models/payload.models';

/**
 * The dummy payload.
 */
export declare type DummyPayload = IPayload<IDummyState>;

/**
 * Maps the component properties.
 */
export interface IDummyState {
  readonly name?: string;
}

/**
 * Maps all the possible actions dispatched by the component.
 */
export interface IDummyActions {
  readonly setupName: (event: ChangeEvent<HTMLInputElement>) => ActionCreator<void>;
}

/**
 * Maps all the form component names constraint.
 */
export interface IDummyForm {
  readonly userName: string;
}
