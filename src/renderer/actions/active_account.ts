import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('ActiveAccount');

export const changeActiveAccount = actionCreator<number>('CHANGE');
