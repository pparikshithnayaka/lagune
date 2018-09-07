import Button from '@/renderer/components/button';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps<{}> {}

class TitleBar extends React.PureComponent<Props> {

  private handleGoBack = () => {
    this.props.history.goBack();
  }

  private handleGoForward = () => {
    this.props.history.goForward();
  }

  public render () {
    const { children } = this.props;

    return (
      <div className='title-bar unselectable'>
        <h2 className='title-bar__title'>
          {children}
        </h2>

        <div className='title-bar__buttons'>
          <Button
            className='title-bar__back-button'
            text='Back'
            linkButton
            onClick={this.handleGoBack}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>

          <Button
            className='title-bar__forward-button'
            text='Forward'
            linkButton
            onClick={this.handleGoForward}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter<Props>(TitleBar);
