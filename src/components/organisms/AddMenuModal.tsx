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
import DefaultFoodImage from '../atoms/DefaultFoodImage';
import { ItemModifier, getShowItemApi } from '../../apis/item';

interface MenuItem {
    id: string;
    name: string;
    price: number;
    image: string;
    modifiers?: ItemModifier[];
}

interface AddMenuModalProps {
    visible: boolean;
    item: MenuItem | null;
    onClose: () => void;

    onAdd: (
        item: MenuItem,
        quantity: number,
        selectedOptions: Record<string, string[]>,
        additionalPrice: number,
        note: string,
        optionsText: string,
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
    const [modifiers, setModifiers] = useState<ItemModifier[]>([]);
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (visible && item) {
            setQuantity(1);
            setNote('');
            setSelectedVariants({});
            setImageError(false);

            if (Array.isArray(item.modifiers) && item.modifiers.length > 0) {
                setModifiers(item.modifiers);
                initDefaultSelections(item.modifiers);
            } else {
                setLoading(true);
                getShowItemApi(item.id)
                    .then(response => {
                        if (response?.success && response?.data?.modifiers) {
                            setModifiers(response.data.modifiers);
                            initDefaultSelections(response.data.modifiers);
                        } else {
                            setModifiers([]);
                        }
                    })
                    .catch(error => {
                        console.log('Error fetching show-item in AddMenuModal:', error);
                        setModifiers([]);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    }, [visible, item]);

    const initDefaultSelections = (mods: ItemModifier[]) => {
        const initialSelections: Record<string, string[]> = {};
        mods.forEach(mod => {
            initialSelections[mod.id] = [];
        });
        setSelectedVariants(initialSelections);
    };

    if (!visible || !item) {
        return null;
    }

    const toggleVariantSelection = (modifierId: string, variantId: string, isSingle: boolean) => {
        setSelectedVariants(prev => {
            const currentSelected = prev[modifierId] || [];

            if (isSingle) {
                return {
                    ...prev,
                    [modifierId]: [variantId],
                };
            }

            if (currentSelected.includes(variantId)) {
                return {
                    ...prev,
                    [modifierId]: currentSelected.filter(id => id !== variantId),
                };
            }

            return {
                ...prev,
                [modifierId]: [...currentSelected, variantId],
            };
        });
    };

    const isAllRequiredModifiersSelected = (): boolean => {
        if (modifiers.length === 0) return true;

        return modifiers.every(mod => {
            const selectedIds = selectedVariants[mod.id] || [];
            const isRequiredGroup = mod.type === 'single' || mod.is_required || (mod.min_selection && mod.min_selection > 0);
            if (isRequiredGroup) {
                return selectedIds.length > 0;
            }
            return true;
        });
    };

    const isAddDisabled = !isAllRequiredModifiersSelected();

    let totalAdditionalPrice = 0;
    const selectedVariantNames: string[] = [];

    modifiers.forEach(mod => {
        const selectedIds = selectedVariants[mod.id] || [];
        if (Array.isArray(mod.variants)) {
            mod.variants.forEach(variant => {
                if (selectedIds.includes(variant.id)) {
                    const priceNum = typeof variant.additional_price === 'string'
                        ? parseFloat(variant.additional_price)
                        : (variant.additional_price || 0);
                    totalAdditionalPrice += priceNum;
                    selectedVariantNames.push(variant.name);
                }
            });
        }
    });

    const totalPrice = (item.price + totalAdditionalPrice) * quantity;
    const optionsText = selectedVariantNames.join(', ');

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleAdd = () => {
        if (isAddDisabled) return;

        onAdd(
            item,
            quantity,
            selectedVariants,
            totalAdditionalPrice,
            note,
            optionsText,
        );

        setQuantity(1);
        setSelectedVariants({});
        setNote('');
        onClose();
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
                            size={largeLayout ? 32 : 22}
                            color="#4B5563"
                        />
                    </Pressable>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.menuHeader}>
                        {item.image && !imageError ? (
                            <Image
                                source={{ uri: item.image }}
                                style={[
                                    styles.image,
                                    largeLayout && styles.largeImage,
                                ]}
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <DefaultFoodImage 
                                width={largeLayout ? 120 : 64} 
                                height={largeLayout ? 120 : 64} 
                                borderRadius={8} 
                            />
                        )}

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

                    {modifiers.map(mod => {
                        const isSingle = mod.type === 'single';
                        const chooseText = isSingle ? 'Choose 1 item' : 'Choose items';
                        const currentSelected = selectedVariants[mod.id] || [];

                        const options = (mod.variants || []).map(v => ({
                            id: v.id,
                            name: v.name,
                            price: typeof v.additional_price === 'string'
                                ? parseFloat(v.additional_price)
                                : (v.additional_price || 0),
                        }));

                        return (
                            <MenuOption
                                key={mod.id}
                                title={mod.name}
                                chooseText={chooseText}
                                options={options}
                                selectedIds={currentSelected}
                                onSelect={(variantId: string) =>
                                    toggleVariantSelection(mod.id, variantId, isSingle)
                                }
                            />
                        );
                    })}

                    <Text style={styles.noteLabel}>
                        Note (Optional)
                    </Text>

                    <TextInput
                        value={note}
                        onChangeText={setNote}
                        placeholder="Add note..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        style={styles.noteInput}
                    />

                </ScrollView>

                <View style={styles.footer}>
                    <Pressable
                        onPress={handleAdd}
                        style={[
                            styles.addButton,
                            isAddDisabled ? styles.addButtonDisabled : styles.addButtonActive,
                        ]}
                        disabled={isAddDisabled}
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
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },

    modal: {
        width: '100%',
        height: '92%',
        maxHeight: '92%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        overflow: 'hidden',
    },

    header: {
        height: 54,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },

    largeTitle: {
        fontSize: 24,
    },

    closeButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scroll: {
        flex: 1,
        paddingHorizontal: 20,
    },

    scrollContent: {
        paddingTop: 16,
        paddingBottom: 24,
    },

    menuHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },

    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
    },

    largeImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },

    menuInfo: {
        flex: 1,
        marginLeft: 14,
        justifyContent: 'center',
    },

    largeMenuInfo: {
        marginLeft: 24,
    },

    menuName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },

    largeMenuName: {
        fontSize: 24,
    },

    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },

    menuPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },

    largeMenuPrice: {
        fontSize: 24,
    },

    noteLabel: {
        marginTop: 20,
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#4B5563',
    },

    noteInput: {
        minHeight: 70,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        padding: 12,
        textAlignVertical: 'top',
        fontSize: 14,
        color: '#111827',
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
    },

    footer: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 24,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },

    addButton: {
        width: '100%',
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addButtonActive: {
        backgroundColor: '#B91C1C',
    },

    addButtonDisabled: {
        backgroundColor: '#A3A3A3',
    },

    addText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default AddMenuModal;