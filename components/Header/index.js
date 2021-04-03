import React from 'react'
import {View, Image} from 'react-native';
import styles from './style';
import Logo from '../../assets/images/NUA-logo.svg';

const Header = () => {

    return (

        <View style={styles.container}>
            {/* <Image style={styles.logo} source={require('../../assets/images/logo.png')} /> */}
            <Logo height={85} width={250} style={styles.logo} />
        </View>

    )

}

export default Header;