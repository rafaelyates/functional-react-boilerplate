import { ChangeEvent } from 'react';
import { ActionCreator } from 'redux';

import { IPayload } from '@app/shared/models/payload.models';

declare type DummyPayload = IPayload<IDummyState>;

interface IDummyState {
  readonly name?: string;
}

interface IDummyActions {
  readonly setupName: (event: ChangeEvent<HTMLInputElement>) => ActionCreator<void>;
}

export { DummyPayload, IDummyState, IDummyActions };
