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
import DefaultFoodImage from '../atoms/DefaultFoodImage';

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

          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
          ) : (
            <DefaultFoodImage width={55} height={55} borderRadius={6} />
          )}

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

        {/* NOTE */}

        <Text style={styles.noteLabel}>
          Add Note
        </Text>

        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="E.g., No onions, extra spicy..."
          placeholderTextColor="#999999"
          style={styles.noteInput}
          multiline={true}
        />

        {/* BUTTON */}

        <Pressable
          onPress={handleUpdate}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Update
          </Text>
        </Pressable>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    justifyContent: 'flex-end',
  },

  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingBottom: 25,
    maxHeight: '90%',
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
    borderRadius: 8,
    padding: 10,
    fontSize: 12,
    color: '#333',
    textAlignVertical: 'top',
  },

  button: {
    height: 38,
    borderRadius: 8,
    backgroundColor: '#8B1D1D',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default EditMenuModal;