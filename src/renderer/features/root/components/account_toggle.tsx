import { VerifiedAccount } from '@/renderer/db';
import AccountToggleButtonContainer from '@/renderer/features/root/containers/account_toggle_button_container';
import { List as ImmutableList } from 'immutable';
import * as React from 'react';

export interface Props {
  me: string;
  accounts: ImmutableList<VerifiedAccount>;
}

export default class AccountToggle extends React.PureComponent<Props> {

  public render () {
    const { accounts, me } = this.props;

    return (
      <div className='account-toggle'>
        <ul className='account-toggle__list'>
          {
            accounts.map((account, i) => (
              <li className='account-toggle__list-item' key={`${i}-${account.url}`}>
                <AccountToggleButtonContainer accountId={me}/>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

}
