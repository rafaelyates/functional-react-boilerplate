import { ComponentType } from 'react';
import { ConnectedComponentClass } from 'react-redux';

import { ConfigProps, DecoratedComponentClass, InjectedFormProps } from 'redux-form';

/**
 * The type used in a redux form component props.
 */
export declare type InjectedProps<Properties, Form> = InjectedFormProps<Form, Properties> & Properties;

/**
 * The type used as props inside a newly created redux form component.
 */
export declare type FormProps<Properties, Form> = Partial<ConfigProps<Form, Properties>> & Properties;

/**
 * The type by a built redux form component.
 */
export declare type ConnectedForm<Properties, Form> = DecoratedComponentClass<
  Form,
  FormProps<Properties, Form>,
  string
>;

/**
 * The type used as props inside a newly connected redux component.
 */
export declare type ConnectedProps<Properties, Form> = ConnectedForm<Properties, Form> | ComponentType<Properties>;

/**
 * The type used by a connected redux component.
 */
export declare type ConnectedComponent<Properties, Form = never> = ConnectedComponentClass<
  ConnectedProps<Properties, Form>,
  Pick<Properties, never>
>;
