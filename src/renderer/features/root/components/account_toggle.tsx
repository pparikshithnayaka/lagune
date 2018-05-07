import Mastodon from '@lagunehq/core';
import * as React from 'react';

export interface Props {
  accounts: Mastodon.Credentials[];
}

export default class AccountToggle extends React.PureComponent<Props> {

  public render () {
    const { accounts } = this.props;

    return (
      <div className='account-toggle'>
        <ul className='account-toggle__list'>
          {
            accounts.map((account, i) => (
              <li className='account-toggle__list-item' key={`${i}-${account.acct}`}>
                <button>
                  <img src={account.avatar_static} alt={account.display_name} />
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

}
