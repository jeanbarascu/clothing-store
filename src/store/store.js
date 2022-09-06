import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// Custom logger middleware
// const customLoggerMiddleware = (state) => (next) => (action) => {
//   if (!action.type) {
//     return action;
//   }

//   console.log('Type:', action.type);
//   console.log('Payload:', action.payload);
//   console.log('Previous State:', store.getState());

//   next(action);

//   console.log('Type:', action.type);
//   console.log('Payload:', action.payload);
//   console.log('Next State:', store.getState());
// };

const middlewares = [logger];

const composeEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composeEnhancers);
