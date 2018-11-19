import React from 'react';
import { Link } from '@reach/router';

const PartialNavLink = props => (
  <Link
    getProps={({ isPartiallyCurrent }) =>
      isPartiallyCurrent ? { className: `${props.className} active` } : null
    }
    {...props}
  />
);

export default PartialNavLink;
