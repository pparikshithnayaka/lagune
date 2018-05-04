import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  verifyCodeProcess,
} from '@/actions/login';

export interface MetaState {
  /** User id of authorized user */
  me?: string;

  /** Access token for the API */
  access_token?: string;

  /** URL of host (e.g. `https://mastodon.social`) */
  url?: string;

  /** Suffix of URL which represents version of the API */
  url_version?: string;

  /** URI of streaming API (e.g. `wss://mastodon.social`) */
  streaming_url?: string;
}

const initialState: MetaState = {};

export default reducerWithInitialState(initialState)
  .case(verifyCodeProcess.done, (state, { result }) => Object.assign({}, state, {
    me:            result.account.id,
    access_token:  result.access_token,
    url:           `https://${result.instance.uri}`,
    url_version:   '/api/v1',
    streaming_url: result.instance.urls.streaming_api,
  }));
