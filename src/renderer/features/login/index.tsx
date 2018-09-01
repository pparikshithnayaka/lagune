import Column from '@/renderer/components/column';
import TitleBar from '@/renderer/components/title_bar';
import CodeFormContainer from '@/renderer/features/login/containers/code_form_container';
import UsernameFromContainer from '@/renderer/features/login/containers/username_form_container';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

export default class Login extends React.PureComponent {

  public render () {
    return (
      <Column>
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
      </Column>
    );
  }

}
