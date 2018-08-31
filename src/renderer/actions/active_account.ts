import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('ActiveAccount');

export const changeActiveAccount = actionCreator<number>('CHANGE');

export const changeActiveAccountProcess = actionCreator.async<
  number,
  number
>('CHANGE_PROCESS');
