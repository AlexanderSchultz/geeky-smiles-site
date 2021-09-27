import React, { ReactChild } from 'react';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  external?: boolean;
  children: ReactChild | ReactChild[];
}

const linkClassName = 'underline text-blue-600 hover:text-blue-800 visited:text-purple-600';
const Link = ({ href, children, external }: LinkProps) => {
  if (external) {
    return <a className={linkClassName} href={href}>{children}</a>;
  }

  return (
    <NextLink href={href}>
      <a className={linkClassName} href={href}>{children}</a>
    </NextLink>
  );
};

Link.defaultProps = {
  external: false,
};

export default Link;
