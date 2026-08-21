import React from 'react';
import {
  Pressable,
  StyleSheet,
} from 'react-native';
import Icons from '../atoms/Icons';

interface ScanNavigationItemProps {
  onPress: () => void;
}

const ScanNavigationItem = ({
  onPress,
}: ScanNavigationItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
    >
      <Icons
        name="scan-outline"
        size={30}
        color="#FFFFFF"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#B91C1C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default ScanNavigationItem;