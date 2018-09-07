import * as Immutable from 'immutable';
import { Action, Reducer, ReducersMapObject } from 'redux';

const createEmptyStateFromReducer = <S, A extends Action>(reducers: ReducersMapObject<S, A>) => {
  const emptyState: { [K in keyof typeof reducers]: any } = Object();

  /* tslint:disable forin */
  for (const reducerName in reducers) {
    emptyState[reducerName] = undefined;
  }
  /* tslint:enable forin */

  return emptyState;
};

/**
 * Combine reducers with immutable like `redux-immutable`
 * but returns Immutable.Record so more type-safe
 * @param reducers Object of reducers
 * @param getDefaultState
 * @return Combined reducer
 */
export function combineReducers <S, A extends Action> (
  reducers: ReducersMapObject<S, A>,
  getDefaultState: (() => Immutable.Record<S>) = (() => Immutable.Record<S>(createEmptyStateFromReducer<S, A>(reducers))()),
): Reducer<Immutable.Record<S>, A> {
  return (inputState: Immutable.Record<S> = getDefaultState(), action: A): Immutable.Record<S> => {
    return inputState.withMutations((temporaryState) => {
      for (const reducerName of Object.keys(reducers) as (keyof S)[]) {
        const reducer = reducers[reducerName];
        const currentDomainState = inputState.get(reducerName, undefined);
        const nextDomainState = reducer(currentDomainState, action);

        temporaryState.set(reducerName, nextDomainState);
      }
    });
  };
}
