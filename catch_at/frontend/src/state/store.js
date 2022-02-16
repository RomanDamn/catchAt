import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/index';
import { rootSaga } from './rootSaga';


export function createStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
      reducer: rootReducer,
      middleware: [sagaMiddleware],
    });
  
    sagaMiddleware.run(rootSaga);
  
    return store;
  }