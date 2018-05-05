import { takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionCreator } from 'typescript-fsa';

/**
 * This helpers helps redux-saga's action key typings
 * can be removed is the next version of redux-saga@1.0.0
 * See: https://github.com/aikoven/typescript-fsa-redux-saga/issues/3
 */

export function takeEveryFsa (actionCreator: ActionCreator<any>, worker: (action: ReturnType<typeof actionCreator>) => any) {
  return takeEvery(actionCreator, worker);
}

export function takeLatestFsa (actionCreator: ActionCreator<any>, worker: (action: ReturnType<typeof actionCreator>) => any) {
  return takeLatest(actionCreator, worker);
}
