import { startCase } from 'lodash/fp';
import { createSelector, OutputSelector } from 'reselect';

import { AppState } from '@app/app.models';
import { DummySelectors } from '@app/dummy/dummy.models';
import { DummyNameSelector } from '@app/dummy/dummy.types';

/**
 * Creates a selector that returns the dummy name with the first letter capitalized.
 * In the dummy actions we already get the name as lower case, just apply startCase.
 */
const getCapitalizedName: OutputSelector<AppState, string, DummyNameSelector> = createSelector(
  (state: AppState) => `${state.dummy.name}`,
  startCase,
);

/**
 * Object used to store all the selectors.
 */
const dummySelectors: DummySelectors = { getCapitalizedName };

export { dummySelectors };
