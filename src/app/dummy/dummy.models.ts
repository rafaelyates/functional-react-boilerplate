import { ChangeEvent } from 'react';

import { ActionCreator } from 'redux';

import { Payload } from '@app/shared/models/payload.models';

/**
 * The dummy payload.
 */
export declare type DummyPayload = Payload<DummyState>;

/**
 * The overall dummy form properties.
 */
export declare type DummyProps = DummyState & DummyActions;

/**
 * Maps the component properties.
 */
export interface DummyState {
  readonly name?: string;
}

/**
 * Maps all the possible actions dispatched by the component.
 */
export interface DummyActions {
  readonly setupName?: (event: ChangeEvent<HTMLInputElement>) => ActionCreator<void>;
}

/**
 * Maps all the form component names constraint.
 */
export interface DummyForm {
  readonly userName: string;
}
