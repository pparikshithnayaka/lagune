import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer, RootState } from '@/reducers';
import { rootSaga } from '@/sagas';

export function configureStore () {
  const composeEnhancers = (
    process.env.NODE_ENV === 'development' &&
    window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore<RootState>(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
