import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface CartBarProps {
    totalQuantity: number;
    totalPrice: number;
    onCartPress: () => void;
    onCheckout: () => void;
}

const CartBar = ({
    totalQuantity,
    totalPrice,
    onCartPress,
    onCheckout,
}: CartBarProps) => {
    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.cartButton}
                onPress={onCartPress}
                activeOpacity={0.7}
            >
                <Text style={styles.cartIcon}>
                    🛒
                </Text>

                {totalQuantity > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {totalQuantity}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>
                    Total
                </Text>
                <Text style={styles.totalPrice}>
                    ${totalPrice.toFixed(2)}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.checkoutButton}
                onPress={onCheckout}
            >
                <Text style={styles.checkoutText}>
                    Check Out
                </Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 25,
        right: 25,
        bottom: 20,
        height: 52,
        borderRadius: 8,
        backgroundColor: '#B91C1C',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        zIndex: 999,
        elevation: 10,
    },

    cartButton: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },

    cartIcon: {
        fontSize: 22,
    },

    badge: {
        position: 'absolute',
        right: 0,
        top: 2,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#A8C600',
        alignItems: 'center',
        justifyContent: 'center',
    },

    badgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '600',
    },

    totalContainer: {
        flex: 1,
        marginLeft: 5,
    },

    totalLabel: {
        color: '#FFFFFF',
        fontSize: 13,
    },

    totalPrice: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
    },

    checkoutButton: {
        height: 34,
        paddingHorizontal: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF55',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkoutText: {
        color: '#FFFFFF',
        fontSize: 13,
    },
});

export default CartBar;