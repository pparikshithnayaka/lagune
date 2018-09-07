import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('login');

export const fetchAuthorizationUrl        = actionCreator<string>('FETCH_AUTHORIZATION_URL');
export const fetchAuthorizationUrlProcess = actionCreator.async<string, string, Error>('FETCH_URL_PROCESS');

export const verifyCode        = actionCreator<string>('VERIFY_CODE');
export const verifyCodeProcess = actionCreator.async<string, string, Error>('VERIFY_CODE_PROCESS');
