import React, { memo } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
import { Field, reduxForm } from 'redux-form';

import dummyStyle from '@app/dummy/dummy.module.scss';

import { dummyActions } from '@app/dummy/dummy.actions';
import { IDummyActions, IDummyForm, IDummyState } from '@app/dummy/dummy.models';
import { ConnectedComponent, ConnectedForm, InjectedProps } from '@app/shared/models/redux.models';
import { IAppState } from '@conf/reducers.config';

declare type DummyProps = IDummyState & IDummyActions;
declare type DummyInjected = InjectedProps<DummyProps, IDummyForm>;

/**
 * Maps the received state to the component properties.
 * @param state The new state.
 */
const mapStateToProps: (state: IAppState) => IDummyState = (state: IAppState) => ({ ...state.dummy });

/**
 * Maps the received actions to the component properties.
 * @param dispatch The actions.
 */
const mapDispatchToProps: (dispatch: Dispatch) => IDummyActions = (dispatch: Dispatch) => bindActionCreators({ ...dummyActions }, dispatch);

/**
 * The functional component.
 */
const component: React.FunctionComponent<DummyInjected> = memo((props: DummyInjected) => (
  <form className='form'>
    <div className='field'>
      <div className='control'>

        <h1 className={`title ${dummyStyle.nameTitle}`}>Hello {props.name}!!</h1>
        <label htmlFor='name' className='label'>Type your name bellow:</label>
        <Field name='userName' component='input' type='text' className='input' onChange={props.setupName} />

      </div>
    </div>
  </form>
));

/**
 * Connects the component inner elements to the redux form.
 */
const formComponent: ConnectedForm<DummyProps, IDummyForm> = reduxForm<IDummyForm, DummyProps>({ form: 'dummyForm' })(component);

/**
 * Connects the form component with the redux general store.
 */
const DummyComponent: ConnectedComponent<DummyProps, IDummyForm> = connect(mapStateToProps, mapDispatchToProps)(formComponent);

export { DummyComponent };
