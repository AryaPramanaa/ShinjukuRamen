import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

const Icon = ({
  name,
  size = 24,
  color = '#000000',
}: IconProps) => {
  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
    />
  );
};

export default Icon;
