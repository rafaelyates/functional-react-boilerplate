import { DummyActions, DummyState } from '@app/dummy/dummy.models';
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
 * The return function of the dummy name selector.
 */
export declare type DummyNameSelector = (name: string) => string;
