import React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';

import dummyStyle from '@app/dummy/dummy.module.scss';

import { dummyActions } from '@app/dummy/dummy.actions';
import { IDummyActions, IDummyState } from '@app/dummy/dummy.models';
import { IAppState } from '@conf/reducers.config';

declare type DummyProps = IDummyState & IDummyActions;
declare type ConnectedDummyComponent = ConnectedComponentClass<React.FunctionComponent<DummyProps>, Pick<DummyProps, never>>;

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
const component: React.FunctionComponent<DummyProps> = React.memo((props: DummyProps) => (
  <div className='row'>
    <div className='col-md-auto'>

      <h1 className={dummyStyle['name-title']}>Hello {props.name}!!</h1>
      <label htmlFor='name' className='form-check-label'>Type your name bellow:</label>
      <input type='text' id='name' className='form-control' onChange={props.setupName} />

    </div>
  </div>
));

/**
 * Connects the component with the redux.
 */
const DummyComponent: ConnectedDummyComponent = connect(mapStateToProps, mapDispatchToProps)(component);

export { DummyComponent };
