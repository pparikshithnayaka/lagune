declare namespace ReduxImmutable {
  import * as Redux from 'redux';
  import { Collection } from 'immutable';

  function combineReducers<S, T>(reducers: Redux.ReducersMapObject, getDefaultState?: () => Immutable.Collection.Keyed<T, S>): Redux.Reducer<S>;
  function combineReducers<S>(reducers: Redux.ReducersMapObject, getDefaultState?: () => Immutable.Collection.Indexed<S>): Redux.Reducer<S>;
}

declare module 'redux-immutable' {
  export = ReduxImmutable;
}
