import React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
import { ConfigProps, DecoratedComponentClass, Field, InjectedFormProps, reduxForm } from 'redux-form';

import dummyStyle from '@app/dummy/dummy.module.scss';

import { dummyActions } from '@app/dummy/dummy.actions';
import { IDummyActions, IDummyForm, IDummyState } from '@app/dummy/dummy.models';
import { IAppState } from '@conf/reducers.config';

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
 * Types used to build the form functional component.
 */
declare type DummyProps = IDummyState & IDummyActions;
declare type InjectedProps = InjectedFormProps<IDummyForm, DummyProps> & DummyProps;

/**
 * The functional component.
 */
const component: React.FunctionComponent<InjectedProps> = React.memo((props: InjectedProps) => (
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
 * Types used to connect the component with redux form.
 */
declare type FormProps = IDummyState & IDummyActions & Partial<ConfigProps<IDummyForm, DummyProps>>;
declare type DummyForm = DecoratedComponentClass<IDummyForm, FormProps, string>;

/**
 * Connects the component inner elements to the redux form.
 */
const formComponent: DummyForm = reduxForm<IDummyForm, DummyProps>({ form: 'dummyForm' })(component);

/**
 * Type used to connect the component to the redux store.
 */
declare type ConnectedDummyComponent = ConnectedComponentClass<DummyForm, Pick<DummyProps, never>>;

/**
 * Connects the form component with the redux general store.
 */
const DummyComponent: ConnectedDummyComponent = connect(mapStateToProps, mapDispatchToProps)(formComponent);

export { DummyComponent };
