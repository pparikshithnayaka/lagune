import { Credentials } from '@lagunehq/core';
import { List as ImmutableList } from 'immutable';
import { action, observable } from 'mobx';

class AuthenticatedAccounts {
  @observable public authenticatedAccounts = ImmutableList<Credentials>();
  @observable.ref public activeAccountIndex = 0;
  @observable public activeAccount = this.authenticatedAccounts.get(this.activeAccountIndex);

  @action.bound public toggleActiveAccount (accountIndex: number) {
    this.activeAccountIndex = accountIndex;
  }

  @action.bound public addAuthenticatedAccount (credentials: Credentials) {
    this.authenticatedAccounts.push(credentials);
  }

  @action.bound public removeAuthenticatedAccount (accountIndex: number) {
    this.authenticatedAccounts.remove(accountIndex);
  }
}

export const authenticatedAccounts = new AuthenticatedAccounts();
