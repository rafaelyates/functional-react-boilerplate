import { createSelector, OutputSelector } from 'reselect';

import { AppState } from '@app/app.models';
import { DummySelectors } from '@app/dummy/dummy.models';
import { DummyNameSelector } from '@app/dummy/dummy.types';

/**
 * Creates a selector that returns the dummy name capitalized.
 */
const getCapitalizedName: OutputSelector<AppState, string, DummyNameSelector> = createSelector(
  (state: AppState) => state.dummy.name || '',
  (name: string) =>
    name.replace(/\w*\S/gi, (value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`),
);

/**
 * Object used to store all the selectors.
 */
const dummySelectors: DummySelectors = { getCapitalizedName };

export { dummySelectors };
