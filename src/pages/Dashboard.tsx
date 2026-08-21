import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

const Dashboard = () => {
    return (
        <View style = {styles.container}>
            <Text style ={styles.title}>Dashboard</Text>
            <Text style = {styles.subtitle} >Selamat datang di dashboard</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#FFFFFF',
        justifyContent : 'center',
        alignItems : 'center'
    },

    title : {
        fontSize : 28,
        fontWeight : '700'
    },

    subtitle : {
        marginTop :8,
        fontSize : 16
    }
})

export default Dashboard;
