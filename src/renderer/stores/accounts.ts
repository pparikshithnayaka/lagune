import { client } from '@/client';
import { authenticatedAccounts } from '@/stores/authenticated_accounts';
import { Account } from '@lagunehq/core';
import { Map as ImmutableMap } from 'immutable';
import { action, observable } from 'mobx';

class Accounts {
  @observable public accounts = ImmutableMap<string, Account[]>();

  @action.bound public async fetchAccount (id: string) {
    const account = await client.fetchAccount(id);
    const activeAccount = authenticatedAccounts.activeAccount;

    this.accounts.set(account.id, account);
  }
}

export const accounts = new Accounts();
