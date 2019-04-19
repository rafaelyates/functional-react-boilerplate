import { Routing } from '@app/app.types';
import { DummyActions, DummyForm, DummyState } from '@app/dummy/dummy.models';
import { Payload } from '@app/shared/models/payload.models';
import { InjectedProps } from '@app/shared/types/redux.types';

/**
 * The dummy payload.
 */
export declare type DummyPayload = Payload<DummyState>;

/**
 * The overall dummy form properties.
 */
export declare type DummyProps = DummyState & DummyActions & Partial<Routing>;

/**
 * The redux form properties.
 */
export declare type DummyInjected = InjectedProps<DummyProps, DummyForm>;

/**
 * The return function of the dummy name selector.
 */
export declare type DummyNameSelector = (name: string) => string;
