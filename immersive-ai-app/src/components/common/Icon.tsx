import React from 'react';
import { IconProps } from '../../types';
import { cn } from '../../utils';

const Icon: React.FC<IconProps> = ({
  active = false,
  size = 20,
  className,
  children
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        active ? 'text-white' : 'text-white/60',
        className
      )}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
};

export default Icon; 