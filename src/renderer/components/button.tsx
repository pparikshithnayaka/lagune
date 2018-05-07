import classNames from 'classnames';
import * as React from 'react';

interface Props {
  className?: string;
  text: string;
  children?: React.ReactNode;
  disabled?: boolean;
  skeleton?: boolean;
  linkButton?: boolean;
  tabIndex?: number;
  onClick?: (...args: any[]) => void;
}

export default class Button extends React.PureComponent<Props> {

  public static defaultProps: Partial<Props> = {
    className: '',
    disabled: false,
    skeleton: false,
    linkButton: false,
    tabIndex: 0,
  };

  private handleClick = () => {
    if ( this.props.onClick && !this.props.disabled ) {
      this.props.onClick();
    }
  }

  public render () {
    const { className, text, children, disabled, onClick, linkButton, skeleton, ...rest } = this.props;
    const classnames = classNames(className, {
      'button': !this.props.linkButton,
      'link-button': this.props.linkButton,
      'button--skeleton': this.props.skeleton,
    });

    return (
      <button
        className={classnames}
        title={text}
        aria-label={text}
        disabled={disabled}
        onClick={this.handleClick}
        {...rest}
      >
        {children || text}
      </button>
    );
  }

}
