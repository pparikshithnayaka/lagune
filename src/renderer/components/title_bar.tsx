import * as React from 'react';
import Button from '@/components/button';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{}> {}

class TitleBar extends React.PureComponent<Props> {

  private handleGoBack = () => {
    this.props.history.goBack();
  }

  public render () {
    const { children } = this.props;

    return (
      <div className='title-bar unselectable'>
        <Button
          className='title-bar__back-button'
          text='Back'
          linkButton
          onClick={this.handleGoBack}
        >
          <i className='fas fa-chevron-left' />
        </Button>

        <h2>{children}</h2>
      </div>
    );
  }
}

export default withRouter<Props>(TitleBar);
