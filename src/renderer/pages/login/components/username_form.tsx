import Button from '@/renderer/components/button';
import { fetchAuthorizationUrl } from '@/renderer/features/login/actions';
import { faCircleNotch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router-dom';

export interface Props extends InjectedIntlProps, RouteComponentProps<void> {
  isSubmitting: boolean;
  isSubmitted: boolean;
  onSubmit: typeof fetchAuthorizationUrl;
}

interface State {
  value: string;
}

export default class UsernameForm extends React.PureComponent<Props, State> {

  public componentDidUpdate (prevProps: Props) {
    if (!prevProps.isSubmitted && this.props.isSubmitted) {
      this.props.history.push('/login/code');
    }
  }

  public state = {
    value: '',
  };

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    this.setState({ value });
  }

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { value } = this.state;

    if ( !value ) {
      return;
    }

    const [, , host] = value.match(/^@(.+?)@(.+?)$/) as string[];

    if ( host !== '' ) {
      this.props.onSubmit(host);
    }
  }

  public render () {
    return (
      <div className='login'>
        <h3 className='login__title'>
          <FormattedMessage id='login.username_form.title' defaultMessage='Add new account to get started with Lagune' />
        </h3>

        <form className='login-form' onSubmit={this.handleSubmit}>
          <input
            className='login-from__input'
            type='text'
            pattern='^@\w{1,30}@[\w\.]+\.\w+$'
            placeholder='@neet@mastodon.social'
            onChange={this.handleChange}
          />

          <Button
            className='login-form__button'
            text='Submit'
            skeleton
          >
            {
              this.props.isSubmitting
                ? <FontAwesomeIcon icon={faCircleNotch} spin />
                : <FontAwesomeIcon icon={faPaperPlane} />
            }
          </Button>
        </form>

        <a className='login__create-account' href='https://joinmastodon.org' target='__blank'>
          <FormattedMessage id='login.create_account' defaultMessage={'Don\'t you have an account yet? You can easily sign up from your favorite instance.'} />
        </a>
      </div>
    );
  }
}
