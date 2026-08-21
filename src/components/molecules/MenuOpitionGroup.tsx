import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icons from '../atoms/Icons';

interface Option {
    id: number;
    name: string;
    price?: number;
}

interface MenuOptionGroupProps {
    title: string;
    chooseText: string;
    options: Option[];
    selectedIds: number[];
    onSelect: (id: number) => void;
    maxSelect?: number;
}

const MenuOptionGroup = ({
    title,
    chooseText,
    options,
    selectedIds,
    onSelect,
    maxSelect = 1,
}: MenuOptionGroupProps) => {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                {title} ({chooseText})
            </Text>

            {options.map(option => {

                const selected =
                    selectedIds.includes(option.id);

                return (
                    <Pressable
                        key={option.id}
                        style={styles.option}
                        onPress={() => onSelect(option.id)}
                    >

                        <Text style={styles.optionName}>
                            {option.name}
                        </Text>

                        <Text style={styles.price}>
                            {option.price && option.price > 0
                                ? `+ AU$ ${option.price.toFixed(2)}`
                                : '0'}
                        </Text>

                        <View
                            style={[
                                styles.checkbox,
                                selected &&
                                styles.checkboxSelected,
                            ]}
                        >
                            {selected && (
                                <Icons
                                    name="checkmark"
                                    size={14}
                                    color="#FFFFFF"
                                />
                            )}
                        </View>

                    </Pressable>
                );
            })}

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        marginTop: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
    },

    title: {
        fontSize: 14,
        color: '#A0A0A0',
        marginBottom: 12,
        fontWeight: '400',
    },

    option: {
        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },

    optionName: {
        flex: 1,
        fontSize: 15,
        color: '#444444',
    },

    price: {
        fontSize: 14,
        color: '#666666',
        marginRight: 14,
    },

    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#EAEAEA',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkboxSelected: {
        backgroundColor: '#8B1D1D',
        borderColor: '#8B1D1D',
    },
});

export default MenuOptionGroup;