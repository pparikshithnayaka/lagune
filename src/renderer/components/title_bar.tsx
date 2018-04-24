import * as React from 'react';

const TitleBar: React.SFC = ({ children }) => (
  <div className='title-bar unselectable'>
    <h2>{children}</h2>
  </div>
);

export default TitleBar;
