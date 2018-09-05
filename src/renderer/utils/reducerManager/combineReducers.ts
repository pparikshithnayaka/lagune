import * as Immutable from 'immutable';
import { Action, Reducer, ReducersMapObject } from 'redux';

/**
 * Combine reducers with immutable like `redux-immutable`
 * but returns Immutable.Record so more type-safe
 * @param reducers Object of reducers
 * @param getDefaultState
 * @return Combined reducer
 */
export function combineReducers <S, A extends Action> (
  reducers: ReducersMapObject<S, A>,
  getDefaultState: (() => Immutable.Record<S>) = (() => Immutable.Record<S>({} as any as S)()),
): Reducer<Immutable.Record<S>, A> {
  return (inputState: Immutable.Record<S> = getDefaultState(), action: A): Immutable.Record<S> => {
    if (!inputState) {
      return inputState;
    }

    for (const [reducerName] of inputState) {
      const reducer = reducers[reducerName];
      const currentDomainState = inputState.get(reducerName, undefined);
      const nextDomainState = reducer(currentDomainState, action);

      inputState.set(reducerName, nextDomainState);
    }

    return inputState;
  };
}
