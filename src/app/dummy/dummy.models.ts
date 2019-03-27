import { ChangeEvent } from 'react';

import { ActionCreator } from 'redux';

import { OutputSelector } from 'reselect';

import { AppState } from '@app/app.models';
import { DummyNameSelector } from '@app/dummy/dummy.types';

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

/**
 * Maps all the selectors constraints.
 */
export interface DummySelectors {
  readonly getCapitalizedName: OutputSelector<AppState, string, DummyNameSelector>;
}
