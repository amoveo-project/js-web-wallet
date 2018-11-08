import React, { Fragment } from 'react';

const NotFound = ({ location }) => (
  <Fragment>
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} didn’t match any pages</p>
  </Fragment>
);

export default NotFound;
