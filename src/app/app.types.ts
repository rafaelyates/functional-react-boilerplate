import { RouteComponentProps, StaticContext } from 'react-router';

import { LocationState } from 'history';

import { RouteActor, RouteInfo } from '@app/app.models';

export declare type RouteData = RouteInfo & RouteActor;

export declare type Routing = RouteComponentProps<Record<string, string>, StaticContext, LocationState>;
