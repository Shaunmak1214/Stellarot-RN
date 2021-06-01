import React from 'react';
import { useEffect } from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Logo from '../../assets/images/NUA-logo.svg';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Font from 'expo-font';

const Header = () => {

    const fonts = {
        'Quicksand': require('../../assets/fonts/Quicksand-Regular.ttf'),
        'Poppins': require('../../assets/fonts/Poppins-Regular.ttf')
    }

    useEffect(() => {
        (async () => {
            try {
                await Font.loadAsync(fonts);
            } catch (err) {
                console.log(err);
            }

        })();
    }), [fonts];

    return (

        <View style={styles.container}>
            <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,borderWidth: 2, borderRadius: 50, borderColor: '#a3a3a3', paddingHorizontal: 7, paddingVertical: 5, marginRight: 15 }} >
                <Icon name='ios-menu' size={25} />
            </TouchableOpacity>
            {/* <Image style={styles.logo} source={require('../../assets/images/logo.png')} /> */}
            <Text style={{fontFamily: 'Poppins', fontSize: 28, fontWeight: '600', color: '#000'}} >Stellarot</Text>
        </View>

    )

}

export default Header;