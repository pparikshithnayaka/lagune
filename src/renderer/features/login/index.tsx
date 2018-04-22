import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  fetchLoginUrlSubmit,
} from '@/actions/login';

const mapDispatchToProps = (dispatch: Dispatch<void>) => ({
  onSubmit (host: string) {
    dispatch(fetchLoginUrlSubmit({ host }));
  },
});

export interface Props {
  onSubmit: (host: string) => void;
}

interface State {
  value: string;
}

export class Login extends React.PureComponent<Props, State> {

  public state = {
    value: '',
  };

  private handleSubmit = () => {
    const { value } = this.state;

    if ( !value ) {
      return;
    }

    const [, , host] = value.match(/^@(.+?)@(.+?)$/) as string[];

    if ( host !== '' ) {
      this.props.onSubmit(host);
    }
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    this.setState({ value });
  }

  public render () {
    return (
      <div className='login'>
        <h2>Login to Lagune</h2>

        <input
          type='text'
          placeholder='@mastodon@mastodon.social'
          onChange={this.handleChange}
        />

        <button
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(Login);
