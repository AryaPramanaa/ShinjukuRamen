import React, { useState, useEffect } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    useWindowDimensions,
} from 'react-native';
import MenuOption from '../molecules/MenuOption';
import Icon from '../atoms/Icon';
import QuantitySelector from '../molecules/QuantitySelector';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    image: string;

    noodles?: {
        id: number;
        name: string;
        price: number;
    }[];

    broth?: {
        id: number;
        name: string;
        price: number;
    }[];

    toppings?: {
        id: number;
        name: string;
        price: number;
    }[];
}

interface AddMenuModalProps {
    visible: boolean;
    item: MenuItem | null;

    onClose: () => void;

    onAdd: (
        item: MenuItem,
        quantity: number,
        selectedOptions: {
            noodles: number[];
            broth: number[];
            toppings: number[];
        },
        additionalPrice: number,
        note: string,
    ) => void;
}

const AddMenuModal = ({
    visible,
    item,
    onClose,
    onAdd,
}: AddMenuModalProps) => {

    const { width } = useWindowDimensions();
    const largeLayout = width >= 700;
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');
    const [selectedNoodles, setSelectedNoodles] =
        useState<number[]>([]);
    const [selectedBroth, setSelectedBroth] =
        useState<number[]>([]);
    const [selectedToppings, setSelectedToppings] =
        useState<number[]>([]);
    useEffect(() => {
        if (visible && item) {
            setQuantity(1);
            setNote('');
            
            setSelectedNoodles(
                item.noodles && item.noodles.length > 0
                    ? [item.noodles[0].id]
                    : []
            );

            if (item.id === 3) {
                setSelectedBroth([3]); 
                setSelectedToppings([3, 4]); 
            } else {
                setSelectedBroth(
                    item.broth && item.broth.length > 0
                        ? [item.broth[0].id]
                        : []
                );
                setSelectedToppings([]);
            }
        }
    }, [visible, item]);

    if (!visible || !item) {
        return null;
    }

    const getOptionPrice = (
        options: {
            id: number;
            price: number;
        }[] | undefined,
        selectedIds: number[],
    ) => {
        if (!options) {
            return 0;
        }

        return options
            .filter(option =>
                selectedIds.includes(option.id),
            )
            .reduce(
                (total, option) =>
                    total + option.price,
                0,
            );
    };

    const noodlesPrice = getOptionPrice(
        item.noodles,
        selectedNoodles,
    );

    const brothPrice = getOptionPrice(
        item.broth,
        selectedBroth,
    );

    const toppingsPrice = getOptionPrice(
        item.toppings,
        selectedToppings,
    );

    const additionalPrice =
        noodlesPrice +
        brothPrice +
        toppingsPrice;

    const totalPrice =
        (item.price + additionalPrice) *
        quantity;

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity(prev =>
            prev > 1 ? prev - 1 : 1,
        );
    };

    const handleAdd = () => {
        onAdd(
            item,
            quantity,
            {
                noodles: selectedNoodles,
                broth: selectedBroth,
                toppings: selectedToppings,
            },
            additionalPrice,
            note,
        );

        // reset
        setQuantity(1);
        setSelectedNoodles([]);
        setSelectedBroth([]);
        setSelectedToppings([]);
        setNote('');
    };

    const toggleOption = (
        id: number,
        selectedIds: number[],
        setSelected: React.Dispatch<
            React.SetStateAction<number[]>
        >,
        maxSelect: number,
    ) => {
        if (selectedIds.includes(id)) {
            setSelected(
                selectedIds.filter(
                    selectedId => selectedId !== id,
                ),
            );
            return;
        }

        if (maxSelect === 1) {
            setSelected([id]);
            return;
        }

        if (selectedIds.length >= maxSelect) {
            return;
        }

        setSelected([
            ...selectedIds,
            id,
        ]);
    };

    const toggleTopping = (toppingId: number) => {
        if (toppingId === 1) { // "None"
            if (selectedToppings.includes(1)) {
                setSelectedToppings([]);
            } else {
                setSelectedToppings([1]);
            }
            return;
        }

        let newToppings = selectedToppings.filter(id => id !== 1);
        if (newToppings.includes(toppingId)) {
            newToppings = newToppings.filter(id => id !== toppingId);
        } else {
            if (newToppings.length < 5) {
                newToppings.push(toppingId);
            }
        }
        setSelectedToppings(newToppings);
    };

    return (
        <View style={styles.overlay}>
            <Pressable
                style={styles.backdrop}
                onPress={onClose}
            />
            <View style={styles.modal}>
                <View style={styles.header}>

                    <Text
                        style={[
                            styles.title,
                            largeLayout && styles.largeTitle,
                        ]}
                    >
                        Add Menu
                    </Text>

                    <Pressable
                        onPress={onClose}
                        style={styles.closeButton}
                    >
                        <Icon
                            name="close"
                            size={largeLayout ? 36 : 24}
                            color="#666666"
                        />
                    </Pressable>

                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scroll}
                    contentContainerStyle={
                        styles.scrollContent
                    }
                >
                    <View style={styles.menuHeader}>

                        <Image
                            source={{
                                uri: item.image,
                            }}
                            style={[
                                styles.image,
                                largeLayout && styles.largeImage,
                            ]}
                        />

                        <View
                            style={[
                                styles.menuInfo,
                                largeLayout && styles.largeMenuInfo,
                            ]}
                        >

                            <Text
                                style={[
                                    styles.menuName,
                                    largeLayout && styles.largeMenuName,
                                ]}
                                numberOfLines={2}
                            >
                                {item.name}
                            </Text>

                            <View style={styles.priceRow}>
                                <Text
                                    style={[
                                        styles.menuPrice,
                                        largeLayout && styles.largeMenuPrice,
                                    ]}
                                >
                                    $ {item.price.toFixed(2)}
                                </Text>

                                <QuantitySelector
                                    quantity={quantity}
                                    onIncrease={handleIncrease}
                                    onDecrease={handleDecrease}
                                    size={largeLayout ? 'medium' : 'small'}
                                />
                            </View>

                        </View>

                    </View>

                    {item.noodles &&
                        item.noodles.length > 0 && (
                            <MenuOption
                                title="Noodles"
                                chooseText="Choose 1 item"
                                options={item.noodles}
                                selectedIds={
                                    selectedNoodles
                                }
                                onSelect={(id: number) =>
                                    toggleOption(
                                        id,
                                        selectedNoodles,
                                        setSelectedNoodles,
                                        1,
                                    )
                                }
                                maxSelect={1}
                            />
                        )}

                    {item.broth &&
                        item.broth.length > 0 && (
                            <MenuOption
                                title="Broth Richness"
                                chooseText="Choose 1 item"
                                options={item.broth}
                                selectedIds={
                                    selectedBroth
                                }
                                onSelect={(id: number) =>
                                    toggleOption(
                                        id,
                                        selectedBroth,
                                        setSelectedBroth,
                                        1,
                                    )
                                }
                                maxSelect={1}
                            />
                        )}

                    {item.toppings &&
                        item.toppings.length > 0 && (
                            <MenuOption
                                title="Toppings"
                                chooseText="Choose 1-5 items"
                                options={item.toppings}
                                selectedIds={
                                    selectedToppings
                                }
                                onSelect={toggleTopping}
                                maxSelect={5}
                            />
                        )}

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

                </ScrollView>

                <View style={styles.footer}>
                    <Pressable
                        onPress={handleAdd}
                        style={styles.addButton}
                    >
                        <Text style={styles.addText}>
                            Add Menu ( $ {totalPrice.toFixed(2)} )
                        </Text>
                    </Pressable>
                </View>

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
        zIndex: 999,
        justifyContent: 'flex-end',
    },

    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor:
            'rgba(0, 0, 0, 0.45)',
    },

    modal: {
        width: '100%',
        height: '94%',
        maxHeight: '94%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,

        overflow: 'hidden',
    },

    header: {
        height: 68,
        paddingHorizontal: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 23,
        fontWeight: '600',
        color: '#222222',
    },

    largeTitle: {
        fontSize: 40,
    },

    closeButton: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scroll: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },

    menuHeader: {
        minHeight: 108,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    image: {
        width: 82,
        height: 82,
        borderRadius: 7,
        backgroundColor: '#EEEEEE',
    },

    largeImage: {
        width: 155,
        height: 155,
        borderRadius: 8,
    },

    menuInfo: {
        flex: 1,
        marginLeft: 16,
        height: 82,
        justifyContent: 'space-between',
        paddingVertical: 3,
    },

    largeMenuInfo: {
        marginLeft: 30,
        height: 155,
        paddingVertical: 5,
    },

    menuName: {
        fontSize: 20,
        lineHeight: 26,
        fontWeight: '600',
        color: '#222222',
    },

    largeMenuName: {
        fontSize: 36,
        lineHeight: 44,
    },

    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 8,
    },

    menuPrice: {
        fontSize: 18,

        color: '#222222',
    },

    largeMenuPrice: {
        fontSize: 34,
    },

    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginLeft: 10,
    },

    largeQuantityContainer: {
        gap: 28,
        marginLeft: 20,
    },

    quantityButton: {
        width: 32,
        height: 32,
        borderWidth: 1,
        borderColor: '#E5B4B4',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    largeQuantityButton: {
        width: 72,
        height: 72,
        borderRadius: 12,
        borderWidth: 2,
    },

    quantityMinus: {
        fontSize: 20,
        lineHeight: 22,
        color: '#B01818',
        fontWeight: '300',
    },

    quantityPlus: {
        fontSize: 20,
        lineHeight: 22,
        color: '#B01818',
        fontWeight: '300',
    },

    largeQuantityText: {
        fontSize: 42,
        lineHeight: 46,
    },

    quantity: {
        minWidth: 18,
        textAlign: 'center',
        fontSize: 16,
        color: '#222222',
        fontWeight: '600',
    },

    largeQuantity: {
        minWidth: 30,
        fontSize: 32,
    },

    noteLabel: {
        marginTop: 20,
        marginBottom: 8,
        fontSize: 15,
        fontWeight: '500',
        color: '#666666',
    },

    noteInput: {
        minHeight: 80,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 10,
        padding: 12,
        textAlignVertical: 'top',
        fontSize: 14,
        color: '#333333',
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },

    footer: {
        paddingHorizontal: 24,
        paddingTop: 10,
        paddingBottom: 24,
        backgroundColor: '#FFFFFF',
    },

    addButton: {
        width: '100%',
        height: 46,
        borderRadius: 5,
        backgroundColor: '#B91C1C',
        alignItems: 'center',
        justifyContent: 'center',
    },

    addText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },

});

export default AddMenuModal;