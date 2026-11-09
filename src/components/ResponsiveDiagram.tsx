import React from 'react';
import clsx from 'clsx';

export default function ResponsiveDiagram({
  className,
  ...props
}: React.ComponentProps<'img'>): React.JSX.Element {
  return (
    <img
      {...props}
      className={clsx('responsive-diagram', className)}
      loading="lazy"
      decoding="async"
    />
  );
}
