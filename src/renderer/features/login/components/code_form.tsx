import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router-dom';
import { verifyCode } from '@/actions/login';
import Button from '@/components/button';

export interface Props extends RouteComponentProps<any> {
  onSubmit: typeof verifyCode;
}

interface State {
  value: string;
}

export default class CodeForm extends React.PureComponent<Props, State> {

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

    if ( value !== '' ) {
      this.props.onSubmit(value);
    }
  }

  public render () {
    return (
      <div className='login'>
        <h3 className='login__title'>
          <FormattedMessage id='login.code_form.title' defaultMessage='Confirm your code' />
        </h3>

        <form className='login-form' onSubmit={this.handleSubmit}>
          <input
            className='login-from__input'
            type='text'
            onChange={this.handleChange}
          />

          <Button className='login-form__button' text='Submit' skeleton>
            <i className='fas fa-paper-plane' aria-hidden='true' />
          </Button>
        </form>
      </div>
    );
  }
}
