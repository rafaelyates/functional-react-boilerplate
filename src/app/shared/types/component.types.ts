import { LazyExoticComponent } from 'react';

import { ConnectedComponent } from '@app/shared/types/redux.types';

/**
 * Helper type for lazy loaded react components.
 */
export declare type LazyLoadedComponent<Properties> = LazyExoticComponent<ConnectedComponent<Properties>>;
