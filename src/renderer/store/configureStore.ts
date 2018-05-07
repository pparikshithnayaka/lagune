import { createStore, applyMiddleware, compose } from 'redux';
import { Action } from 'typescript-fsa';
import { reducer, RootState } from '@/reducers';
import rootSaga from '@/sagas';
import errorMiddleware from '@/middlewares/error';
import createSagaMiddleware from 'redux-saga';

export function configureStore () {
  const composeEnhancers = (
    process.env.NODE_ENV === 'development' &&
    window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore<RootState, Action<any>, {}, {}>(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, errorMiddleware())),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
