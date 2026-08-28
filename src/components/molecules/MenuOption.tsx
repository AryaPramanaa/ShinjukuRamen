import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icon from '../atoms/Icon';

interface Option {
    id: string | number;
    name: string;
    price?: number;
}

interface MenuOptionProps {
    title: string;
    chooseText: string;
    options: Option[];
    selectedIds: (string | number)[];
    onSelect: (id: any) => void;
    maxSelect?: number;
}

const MenuOption = ({
    title,
    chooseText,
    options,
    selectedIds,
    onSelect,
}: MenuOptionProps) => {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                {title} ({chooseText})
            </Text>

            {options.map(option => {
                const selected = selectedIds.includes(option.id);
                const hasPrice = option.price && option.price > 0;

                return (
                    <Pressable
                        key={String(option.id)}
                        style={styles.option}
                        onPress={() => onSelect(option.id)}
                    >

                        <Text style={styles.optionName}>
                            {option.name}
                        </Text>

                        <Text style={styles.price}>
                            {hasPrice ? `+ $ ${option.price!.toFixed(2)}` : '0'}
                        </Text>

                        <View
                            style={[
                                styles.checkbox,
                                selected && styles.checkboxSelected,
                            ]}
                        >
                            {selected && (
                                <Icon
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
        marginTop: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
    },

    title: {
        fontSize: 13,
        color: '#9CA3AF',
        marginBottom: 10,
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
        color: '#374151',
    },

    price: {
        fontSize: 14,
        color: '#6B7280',
        marginRight: 14,
    },

    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#D1D5DB',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkboxSelected: {
        backgroundColor: '#B91C1C',
        borderColor: '#B91C1C',
    },
});

export default MenuOption;
