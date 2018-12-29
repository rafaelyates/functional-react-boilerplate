import { connectRouter, LocationChangeAction, routerMiddleware, RouterState } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { Middleware, Reducer } from 'redux';

const browserHistory: History = createBrowserHistory();
const history: Middleware = routerMiddleware(browserHistory);
const routerReducer: Reducer<RouterState, LocationChangeAction> = connectRouter(browserHistory);

export { browserHistory, routerReducer, history };
