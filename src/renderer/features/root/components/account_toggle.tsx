import { AccountToggleButtonContainer } from '@/renderer/features/root/containers/account_toggle_button_container';
import { VerifiedAccount } from '@/renderer/utils/database/tables/verified_account';
import * as React from 'react';

export interface Props {
  me?: number;
  accounts: VerifiedAccount[];
  accountIds: number[];
}

export class AccountToggle extends React.PureComponent<Props> {

  public render () {
    const { accounts, me } = this.props;

    if (!accounts || !me) {
      return <div />;
    }

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
