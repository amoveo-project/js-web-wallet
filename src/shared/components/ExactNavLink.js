import React from 'react';
import { Link } from '@reach/router';

const ExactNavLink = props => (
  <Link
    getProps={({ isCurrent }) =>
      isCurrent ? { className: `${props.className} active` } : null
    }
    {...props}
  />
);

export default ExactNavLink;
