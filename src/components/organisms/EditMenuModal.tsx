import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import QuantitySelector from '../molecules/QuantitySelector';

interface EditMenuModalProps {
  visible: boolean;
  item: any | null;

  onClose: () => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onUpdateNote: (
    id: number,
    note: string,
  ) => void;
}

const EditMenuModal = ({
  visible,
  item,
  onClose,
  onIncrease,
  onDecrease,
  onUpdateNote,
}: EditMenuModalProps) => {

  const [note, setNote] = useState('');

  useEffect(() => {
    if (item) {
      setNote(item.note || '');
    }
  }, [item]);

  if (!visible || !item) {
    return null;
  }

  const handleUpdate = () => {

    onUpdateNote(
      item.id,
      note,
    );

    onClose();
  };

  return (
    <View style={styles.overlay}>

      <Pressable
        style={styles.backdrop}
        onPress={onClose}
      />

      <View style={styles.modal}>

        {/* HEADER */}

        <View style={styles.header}>

          <Text style={styles.title}>
            Update Menu
          </Text>

          <Pressable onPress={onClose}>
            <Text style={styles.close}>
              ×
            </Text>
          </Pressable>

        </View>

        {/* MENU */}

        <View style={styles.menuContainer}>

          <Image
            source={{uri: item.image}}
            style={styles.image}
          />

          <View style={styles.menuInfo}>

            <Text style={styles.name}>
              {item.name}
            </Text>

            <View style={styles.bottomRow}>

              <Text style={styles.price}>
                $ {item.price.toFixed(2)}
              </Text>

              <QuantitySelector
                quantity={item.quantity}
                onIncrease={() => onIncrease(item.id)}
                onDecrease={() => onDecrease(item.id)}
              />
            </View>
          </View>
        </View>

        <Text style={styles.noteLabel}>
          Note (Optional)
        </Text>

        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Add note..."
          placeholderTextColor="#CCCCCC"
          multiline
          style={styles.noteInput}
        />

        {/* UPDATE */}
        <Pressable
          style={styles.updateButton}
          onPress={handleUpdate}
        >
          <Text style={styles.updateText}>
            Update Menu
          </Text>
        </Pressable>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 300,
    justifyContent: 'flex-end',
  },

  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 15,
  },

  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  close: {
    fontSize: 25,
    color: '#777',
  },

  menuContainer: {
    minHeight: 85,
    padding: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    flexDirection: 'row',
  },

  image: {
    width: 55,
    height: 55,
    borderRadius: 6,
  },

  menuInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222',
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 12,
    color: '#333',
  },

  noteLabel: {
    marginTop: 15,
    marginBottom: 7,
    fontSize: 12,
    color: '#777',
  },

  noteInput: {
    height: 62,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 6,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 12,
    color: '#333',
  },

  updateButton: {
    height: 42,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#B91C1C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  updateText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default EditMenuModal;