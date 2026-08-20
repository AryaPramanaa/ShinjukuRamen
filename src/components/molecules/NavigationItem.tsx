import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icons from '../atoms/Icons';

type IconName =
  React.ComponentProps<typeof Ionicons>['name'];

interface NavigationItemProps {
  label: string;
  icon: IconName;
  active?: boolean;
  onPress: () => void;
}

const NavigationItem = ({
  label,
  icon,
  active = false,
  onPress,
}: NavigationItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
    >
      <Icons
        name={icon}
        size={24}
        color={
          active
            ? '#2563EB'
            : '#9CA3AF'
        }
      />

      <Text
        style={[
          styles.label,
          active && styles.activeLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
  },

  activeLabel: {
    color: '#2563EB',
  },
});

export default NavigationItem;