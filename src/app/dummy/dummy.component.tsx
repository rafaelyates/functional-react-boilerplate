import { FunctionComponent, memo } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { compose } from 'recompose';

import dummyStyle from '@app/dummy/dummy.module.scss';

import { AppState } from '@app/app.models';
import { dummyActions } from '@app/dummy/dummy.actions';
import { dummySelectors } from '@app/dummy/dummy.selectors';
import { DummyInjected, DummyProps } from '@app/dummy/dummy.types';

/**
 * The functional component.
 */
const DummyComponent: FunctionComponent<DummyInjected> = memo((props: DummyInjected) => (
  <form className="form">
    <div className="field">
      <div className="control">
        <h1 className={`title ${dummyStyle.nameTitle}`}>Hello {props.name}!!</h1>
        <label htmlFor="name" className="label">
          Type your name bellow:
        </label>
        <Field name="userName" component="input" type="text" className="input" onChange={props.setupName} />
      </div>
    </div>
  </form>
));

/**
 * Composes the component as the following:
 * - Connects the component inner elements to the redux form.
 * - Connects the form component with the redux general store.
 */
export default compose<DummyInjected, DummyProps>(
  reduxForm({ form: 'dummyForm' }),
  connect(
    (state: AppState) => ({
      name: dummySelectors.getCapitalizedName(state),
    }),
    (dispatch: Dispatch) => bindActionCreators({ ...dummyActions }, dispatch),
  ),
)(DummyComponent);
