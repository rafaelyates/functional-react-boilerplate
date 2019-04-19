import { FunctionComponent, LazyExoticComponent } from 'react';

/**
 * Helper type for lazy loaded react components.
 */
export declare type LazyLoadedComponent<Properties> = LazyExoticComponent<FunctionComponent<Properties>>;
