import { fetchVerifiedAccounts } from '@/renderer/features/database/actions';
import Accounts from '@/renderer/pages/accounts';
import Login from '@/renderer/pages/login';
import ActivityBarContainer from '@/renderer/pages/root/containers/activity_bar_container';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';

export interface Props extends RouteComponentProps<{}> {
  onLoad: typeof fetchVerifiedAccounts;
}

class Root extends React.PureComponent<Props> {

  public componentDidMount () {
    this.props.onLoad();
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
