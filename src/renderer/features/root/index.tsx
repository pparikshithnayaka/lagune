import * as React from 'react';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import ActivityBar from '@/features/root/components/activity_bar';
import Login from '@/features/login';

export interface Props extends RouteComponentProps<any> {
}

class Root extends React.PureComponent<Props> {

  public componentDidMount () {
    const isLoggedIn = false;

    if ( !isLoggedIn ) {
      this.props.history.push('/login/username');
    }
  }

  public render () {
    return (
      <div className={`root root--${process.platform}`}>
        <ActivityBar />

        <div className='columns'>
          <Switch>
            <Route path='/login' component={Login} />
          </Switch>
        </div>
      </div>
    );
  }

}

export default withRouter<Props>(Root);
