import errorMiddleware from '@/renderer/middlewares/error';
import { RootAction } from '@/renderer/store/actions';
import { reducer, RootState } from '@/renderer/store/reducers';
import rootSaga from '@/renderer/store/sagas';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

export function configureStore () {
  const composeEnhancers = (
    process.env.NODE_ENV === 'development' &&
    window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore<RootState, RootAction, void, void>(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, errorMiddleware())),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
