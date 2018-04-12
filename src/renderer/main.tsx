import * as React from 'react';
import * as ReactDOM from 'react-dom';

const main = () => {
  const mountNode = document.getElementById('root');

  if ( mountNode ) {
    ReactDOM.render(<div />, mountNode);
  }
};

main();
