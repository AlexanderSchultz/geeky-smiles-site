import React, { ReactChild } from 'react';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: ReactChild | ReactChild[]
}

export default function Link({ href, children }: LinkProps) {
  return (
    <NextLink href={href}>
      <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href={href}>{children}</a>
    </NextLink>
  );
}
