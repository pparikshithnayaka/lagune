import { verifyCode } from '@/renderer/actions/login';
import Button from '@/renderer/components/button';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router-dom';

export interface Props extends RouteComponentProps<void> {
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
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </form>
      </div>
    );
  }
}
