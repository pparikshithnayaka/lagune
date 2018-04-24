import * as React from 'react';
import { Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { AnimatedSwitch } from 'react-router-transition';
import UsernameFromContainer from '@/features/login/containers/username_form_container';
import CodeFormContainer from '@/features/login/containers/code_form_container';
import TitleBar from '@/components/title_bar';

export default class Login extends React.PureComponent {

  public render () {
    return (
      <div className='column'>
        <TitleBar>
          <FormattedMessage id='login.title_bar' defaultMessage='Add new account' />
        </TitleBar>

        <AnimatedSwitch
          className='animated-swtich'
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        >
          <Route exact path='/login/username' component={UsernameFromContainer} />
          <Route exact path='/login/code' component={CodeFormContainer} />
        </AnimatedSwitch>
      </div>
    );
  }

}
