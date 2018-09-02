import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('Login');

export const fetchAuthorizationUrl        = actionCreator<string>('FETCH_AUTHORIZATION_URL');
export const fetchAuthorizationUrlProcess = actionCreator.async<string, string>('FETCH_URL_PROCESS');

export const verifyCode        = actionCreator<string>('VERIFY_CODE');
export const verifyCodeProcess = actionCreator.async<string, string>('VERIFY_CODE_PROCESS');
