import React from 'react';
import * as FiIcons from 'react-icons/fi';

interface IconProps {
  name: keyof typeof FiIcons;
  size?: number;
  className?: string;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({ name, size = 20, className = '', ...rest }) => {
  const IconComponent = FiIcons[name] || FiIcons.FiHelpCircle;
  return (
    <IconComponent size={size} className={`stroke-[1.5] ${className}`} {...rest} />
  );
};

export { Icon }; 