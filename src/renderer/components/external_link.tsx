import * as React from 'react';
import { shell } from 'electron';

const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();

  const href = e.currentTarget.getAttribute('href');

  if ( href === null ) {
    return;
  }

  shell.openExternal(href);
};

interface Props {
  [key: string]: any;
}

const ExternalLink: React.SFC<Props> = ({ href, children, ...rest }) => (
  <a href={href} onClick={handleClick} {...rest}>
    {children}
  </a>
);

export default ExternalLink;
