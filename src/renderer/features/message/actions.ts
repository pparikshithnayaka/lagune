import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('message');

export const showMessage = actionCreator<{
  type: 'success'|'failure'|'hidden';
  text: string;
}>('SHOW');

export const hideMessage = actionCreator<void>('HIDE');
