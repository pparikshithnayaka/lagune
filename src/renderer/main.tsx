import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Lagune from '@/containers/lagune';

const main = () => {
  const mountNode = document.getElementById('root');

  if ( mountNode ) {
    ReactDOM.render(<Lagune locale='ja' />, mountNode);
  }
};

main();
