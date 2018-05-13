import Lagune from '@/containers/lagune';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const main = () => {
  const mountNode = document.getElementById('lagune');

  if ( mountNode ) {
    ReactDOM.render(<Lagune locale='ja' />, mountNode);
  }
};

main();
