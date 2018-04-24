import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router-dom';
import Button from '@/components/button';

export interface Props extends RouteComponentProps<any> {
  isSubmitting: boolean;
  isSubmitted: boolean;
  onSubmit: (host: string) => void;
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
            pattern='^@\w{1,30}@\w+\.\w+$'
            placeholder='@neet@mastodon.social'
            onChange={this.handleChange}
          />

          <Button
            className='login-form__button'
            text='Submit'
            skeleton
          >
            <i className='fas fa-paper-plane' aria-hidden='true' />
          </Button>
        </form>

        <p className='login__description'>
          <strong>
            <FormattedMessage id='login.username_form.description_short' defaultMessage='Why authorization required?' />
          </strong>

          <FormattedMessage id='login.username_form.description_long' defaultMessage='Since Lagune have to send requests from its client, you need to authorize it in Mastodon for using Lagune. Input your username to from above and paste the code after authorization.' />
        </p>
      </div>
    );
  }
}
