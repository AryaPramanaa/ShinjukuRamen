import React, {
    useState,
    useCallback
} from 'react';

import {
    useFocusEffect,
} from '@react-navigation/native';
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    CameraView,
    useCameraPermissions,
    BarcodeScanningResult,
} from 'expo-camera';

import Icons from '../atoms/Icons';

interface QRScannerProps {
    onClose: () => void;
    onScanned?: (data: string) => void;
}

const QRScanner = ({
    onClose,
    onScanned,
}: QRScannerProps) => {

    const [
        permission,
        requestPermission,
    ] = useCameraPermissions();

    const [
        scanned,
        setScanned,
    ] = useState(false);

    useFocusEffect(
        useCallback(() => {

            setScanned(false);

        }, [])
    );

    const [
        torch,
        setTorch,
    ] = useState(false);

    const handleBarcodeScanned = (
        result: BarcodeScanningResult,
    ) => {

        if (scanned) {
            return;
        }

        setScanned(true);

        const data = result.data;

        if (onScanned) {
            onScanned(data);
            return;
        }

        Alert.alert(
            'QR Code Berhasil',
            data,
        );
    };

    if (!permission) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                    Memeriksa izin kamera...
                </Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>

                <Icons
                    name="camera-outline"
                    size={48}
                    color="#FFFFFF"
                />

                <Text style={styles.permissionTitle}>
                    Kamera Dibutuhkan
                </Text>

                <Text style={styles.permissionText}>
                    Izinkan aplikasi menggunakan kamera
                    untuk melakukan scan QR Code.
                </Text>

                <Pressable
                    onPress={requestPermission}
                    style={styles.permissionButton}
                >
                    <Text style={styles.permissionButtonText}>
                        Izinkan Kamera
                    </Text>
                </Pressable>

            </View>
        );
    }

    return (
        <View style={styles.container}>

            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                enableTorch={torch}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
                onBarcodeScanned={
                    scanned
                        ? undefined
                        : handleBarcodeScanned
                }
            />

            {/* OVERLAY */}

            <View style={styles.overlay}>

                {/* HEADER */}

                <View style={styles.header}>

                    <Pressable
                        onPress={onClose}
                        style={styles.headerButton}
                    >
                        <Icons
                            name="close"
                            size={26}
                            color="#FFFFFF"
                        />
                    </Pressable>

                    <Text style={styles.title}>
                        Scan QR Code
                    </Text>

                    <Pressable
                        onPress={() => {
                            setTorch((value) => !value);
                        }}
                        style={styles.headerButton}
                    >
                        <Icons
                            name={
                                torch
                                    ? 'flash'
                                    : 'flash-outline'
                            }
                            size={25}
                            color="#FFFFFF"
                        />
                    </Pressable>

                </View>

                {/* SCAN AREA */}

                <View style={styles.scanArea}>

                    <View
                        style={[
                            styles.corner,
                            styles.topLeft,
                        ]}
                    />

                    <View
                        style={[
                            styles.corner,
                            styles.topRight,
                        ]}
                    />

                    <View
                        style={[
                            styles.corner,
                            styles.bottomLeft,
                        ]}
                    />

                    <View
                        style={[
                            styles.corner,
                            styles.bottomRight,
                        ]}
                    />

                </View>

                <Text style={styles.instruction}>
                    Arahkan kamera ke QR Code
                </Text>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000000',
    },

    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },

    header: {
        height: 90,
        paddingTop: 40,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    headerButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.45)',
    },

    title: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },

    scanArea: {
        width: 260,
        height: 260,
        alignSelf: 'center',
        marginTop: 120,
        position: 'relative',
    },

    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: '#FFFFFF',
    },

    topLeft: {
        top: 0,
        left: 0,
        borderTopWidth: 4,
        borderLeftWidth: 4,
    },

    topRight: {
        top: 0,
        right: 0,
        borderTopWidth: 4,
        borderRightWidth: 4,
    },

    bottomLeft: {
        bottom: 0,
        left: 0,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
    },

    bottomRight: {
        bottom: 0,
        right: 0,
        borderBottomWidth: 4,
        borderRightWidth: 4,
    },

    instruction: {
        marginTop: 30,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 15,
    },

    permissionContainer: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },

    permissionTitle: {
        marginTop: 20,
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
    },

    permissionText: {
        marginTop: 10,
        color: '#D1D5DB',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 21,
    },

    permissionButton: {
        marginTop: 24,

        paddingHorizontal: 24,
        paddingVertical: 12,

        borderRadius: 8,

        backgroundColor: '#2563EB',
    },

    permissionButtonText: {
        color: '#FFFFFF',

        fontSize: 14,
        fontWeight: '600',
    },

});

export default QRScanner;