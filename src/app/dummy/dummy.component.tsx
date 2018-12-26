import React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { setupName } from '@app/dummy/dummy.actions';
import dummyStyle from '@app/dummy/dummy.module.scss';
import { IAppState } from '@conf/reducers.config';

declare type Props = IDummyComponentState & IDummyComponentDispatch;
declare type ConnectedDummyComponent = ConnectedComponentClass<React.FunctionComponent<Props>, Pick<Props, never>>;

interface IDummyComponentState {
  readonly name?: string;
}

interface IDummyComponentDispatch {
  readonly setupName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const mapStateToProps: (state: IAppState) => IDummyComponentState = (state: IAppState) => ({
  name: state.dummy.name
});

const mapDispatchToProps: (dispatch: Dispatch) => IDummyComponentDispatch = (dispatch: Dispatch) => bindActionCreators(
  { setupName },
  dispatch
);

const component: React.FunctionComponent<Props> = React.memo((props: Props) => (
  <div className='row'>
    <div className='col-md-auto'>

      <h1 className={dummyStyle['name-title']}>Hello {props.name}!!</h1>
      <label htmlFor='name' className='form-check-label'>Type your name bellow:</label>
      <input type='text' id='name' className='form-control' onChange={props.setupName} />

    </div>
  </div>
));

const DummyComponent: ConnectedDummyComponent = connect(mapStateToProps, mapDispatchToProps)(component);

export { DummyComponent };
