import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '@/reducers';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Mastodon from '@lagunehq/core';
import Column from '@/components/column';
import TitleBar from '@/components/title_bar';

export interface Props extends RouteComponentProps<any> {
  account: Mastodon.Account;
}

class Accounts extends React.PureComponent<Props> {

  public render () {
    const { account } = this.props;

    if ( account === undefined) {
      return <div />; // Loading indicator
    }

    return (
      <Column>
        <TitleBar>
          {account.display_name || account.username}
        </TitleBar>

        <img src={account.avatar_static || ''} alt={account.display_name} />
        <p dangerouslySetInnerHTML={{ __html: account.note}} />
      </Column>
    );
  }

}

const mapStateToProps = (state: RootState, ownProps: Props) => ({
  account: state.accounts[ownProps.match.params.accountId] || undefined,
});

export default connect(mapStateToProps)(withRouter<Props>(Accounts));
