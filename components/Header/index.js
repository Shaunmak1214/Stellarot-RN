import React from 'react'
import {View, Image, Text} from 'react-native';
import styles from './style';
import Logo from '../../assets/images/NUA-logo.svg';

const Header = () => {

    return (

        <View style={styles.container}>
            {/* <Image style={styles.logo} source={require('../../assets/images/logo.png')} /> */}
            <Text>Stellarot</Text>
        </View>

    )

}

export default Header;