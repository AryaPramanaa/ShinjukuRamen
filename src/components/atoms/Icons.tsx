import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface IconsProps {
  name: IconName;
  size?: number;
  color?: string;
}

const Icons = ({
  name,
  size = 24,
  color = '#000000',
}: IconsProps) => {
  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
    />
  );
};

export default Icons;