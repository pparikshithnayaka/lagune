import errorMiddleware from '@/renderer/middlewares/error';
import { reducer, RootState } from '@/renderer/reducers';
import rootSaga from '@/renderer/sagas';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Action } from 'typescript-fsa';

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
