import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import NuaDaily from '../components/Daily'

export default function home() {
    return (
        <View style={styles.container}>
            <Header />
            <NuaDaily style={styles.nuadaily} />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    nuadaily: {
        marginTop: 200
    }
});

