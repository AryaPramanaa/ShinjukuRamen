import React, {useEffect} from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';

const SplashScreen = ({navigation}: any) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('MainTabs');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>

            <Image
                source={require('../Assets/ramen-Photoroom.png')}
                style={styles.logo}
                resizeMode="contain"
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    logo: {
        width: 400,
        height: 400,
    },
});

export default SplashScreen;
