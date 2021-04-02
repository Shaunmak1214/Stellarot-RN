import React from 'react'
import {View, Image} from 'react-native';
import styles from './style';
/* import Icon from '../Logo'; */

const Header = () => {

    return (

        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
            {/* <Icon /> */}
        </View>

    )

}

export default Header;