import React from 'react';
import styled from 'styled-components';

const Link = styled.a``;

const ExternalLink = ({ children, to = '', ...props }) => {
  return (
    <Link href={to} target="_blank" rel="noopener noreferrer" $ {...props}>
      {children}
    </Link>
  );
};

export default ExternalLink;
