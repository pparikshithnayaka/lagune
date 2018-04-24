import * as React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  text: string;
  children?: React.ReactNode;
  disabled?: boolean;
  skeleton?: boolean;
  tabIndex?: number;
  onClick?: (...args: any[]) => void;
}

export default class Button extends React.PureComponent<Props> {

  public static defaultProps: Partial<Props> = {
    className: '',
    disabled: false,
    tabIndex: 0,
  };

  private handleClick = () => {
    if ( this.props.onClick && !this.props.disabled ) {
      this.props.onClick();
    }
  }

  public render () {
    const { className, text, children, disabled, skeleton, onClick, ...rest } = this.props;
    const classnames = classNames('button', className, { 'button--skeleton': skeleton });

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
