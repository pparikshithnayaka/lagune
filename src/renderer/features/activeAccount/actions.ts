import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('activeAccount');

export const changeActiveAccount        = actionCreator<number>('CHANGE');
export const changeActiveAccountProcess = actionCreator.async<number, number, Error>('CHANGE_PROCESS');
