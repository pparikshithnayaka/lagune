import * as React from 'react';
import { connect } from 'react-redux';
import { fetchVerifiedAccounts } from '@/actions/verified_account';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import ActivityBarContainer from '@/features/root/containers/activity_bar_container';
import Login from '@/features/login';
import Accounts from '@/features/accounts';

export interface Props extends RouteComponentProps<{}> {
  onLoad: typeof fetchVerifiedAccounts;
}

class Root extends React.PureComponent<Props> {

  public componentDidMount () {
    this.props.onLoad({});
  }

  public render () {
    return (
      <div className='root'>
        <ActivityBarContainer />

        <div className='columns'>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/accounts/:accountId' component={Accounts} />
          </Switch>
        </div>
      </div>
    );
  }

}

export default connect(
  null,
  { onLoad: fetchVerifiedAccounts },
)(withRouter<Props>(Root));
