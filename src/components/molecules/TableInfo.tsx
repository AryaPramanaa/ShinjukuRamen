import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface TableInfoProps {
  tableNumber?: string;
}

const TableInfo = ({
  tableNumber = '',
}: TableInfoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Table
      </Text>

      <View style={styles.badge}>
        <Text style={styles.text}>
          {tableNumber}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 75,
    marginHorizontal: 20,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },

  label: {
    fontSize: 16,
    color: '#B6A09A',
  },

  badge: {
    minWidth: 42,
    height: 36,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
  },

  text: {
    fontSize: 15,
    color: '#737373',
  },
});

export default TableInfo;