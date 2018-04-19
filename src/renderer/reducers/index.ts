import { combineReducers } from 'redux';
import { users, UserState } from '@/reducers/users';
import { login, LoginState } from '@/reducers/login';
import { meta, MetaState } from '@/reducers/meta';
import { credentials, CredentialsState } from '@/reducers/credentials';
import { teams, TeamsState } from '@/reducers/teams';
import { teamList, TeamListState } from '@/reducers/team_list';

export interface RootState {
  users: UserState;
  login: LoginState;
  meta: MetaState;
  teams: TeamsState;
  teamList: TeamListState;
  credentials: CredentialsState;
}

export const reducer = combineReducers<RootState>({
  users,
  login,
  meta,
  teams,
  teamList,
  credentials,
});
