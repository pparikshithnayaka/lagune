import AccountToggleButtonContainer from '@/features/root/containers/account_toggle_button_container';
import * as Lagune from '@@/typings/lagune';
import { List as ImmutableList } from 'immutable';
import * as React from 'react';

export interface Props {
  accounts: ImmutableList<Lagune.VerifiedAccount>;
}

export default class AccountToggle extends React.PureComponent<Props> {

  public render () {
    const { accounts } = this.props;

    return (
      <div className='account-toggle'>
        <ul className='account-toggle__list'>
          {
            accounts.map((account, i) => (
              <li className='account-toggle__list-item' key={`${i}-${account.url}`}>
                <AccountToggleButtonContainer accountId={account.me} />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

}
