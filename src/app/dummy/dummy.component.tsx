import { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators, compose, Dispatch } from 'redux';
import { Field, reduxForm } from 'redux-form';

import dummyStyle from '@app/dummy/dummy.module.scss';

import { AppState } from '@app/app.models';
import { dummyActions } from '@app/dummy/dummy.actions';
import { DummyForm } from '@app/dummy/dummy.models';
import { dummySelectors } from '@app/dummy/dummy.selectors';
import { DummyInjected, DummyProps } from '@app/dummy/dummy.types';
import { ConnectedComponent } from '@app/shared/types/redux.types';

/**
 * The functional component.
 */
const DummyComponent: FunctionComponent<DummyInjected> = (props: DummyInjected) => {
  return (
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
  );
};

/**
 * Composes the component as the following:
 * - Connects the component inner elements to the redux form.
 * - Connects the form component with the redux general store.
 */
export default compose<ConnectedComponent<DummyProps, DummyForm>>(
  connect(
    (state: AppState) => ({
      name: dummySelectors.getCapitalizedName(state),
    }),
    (dispatch: Dispatch) => bindActionCreators({ ...dummyActions }, dispatch),
  ),
  reduxForm({ form: 'dummyForm' }),
)(DummyComponent);
