import { ChangeEvent } from 'react';

import { ActionCreator } from 'redux';

import { IPayload } from '@app/shared/models/payload.models';

export declare type DummyPayload = IPayload<IDummyState>;

export interface IDummyState {
  readonly name?: string;
}

export interface IDummyActions {
  readonly setupName: (event: ChangeEvent<HTMLInputElement>) => ActionCreator<void>;
}
