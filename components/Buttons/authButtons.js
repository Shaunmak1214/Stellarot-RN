import React from 'react';
import { View, Button, StyleSheet, TouchableHighlight, Text } from "react-native";
import Ripple from 'react-native-material-ripple';

import GoogleIcon from '../../assets/images/google.svg';
import FacebookIcon from '../../assets/images/facebook.svg';

export const LoginButton = ({ onPress, title }) => (
    <Ripple 
        onPress={onPress} 
        style={styles.appButtonContainerLogin}
        rippleColor='#00B2FF'
        rippleOpacity={0.55}
        rippleDuration={1000}
        rippleSize={1000}
        rippleCentered={false}
    >
      <Text style={styles.appButtonTextLogin}>Log In</Text>
    </Ripple>
);

export const SignUpButton = ({ onPress, title }) => (
    <Ripple 
        onPress={onPress} 
        style={styles.appButtonContainerSignUp}
        rippleColor='#00B2FF'
        rippleOpacity={0.55}
        rippleDuration={1000}
        rippleSize={1000}
        rippleCentered={false}
    >
      <Text style={styles.appButtonTextSignUp}>Sign Up</Text>
    </Ripple>
);

export const LogOutButton = ({ onPress }) => (
    <Ripple 
        onPress={onPress} 
        style={ [styles.appButtonContainerLogin, { marginTop: 20 }] }
        rippleColor='#00B2FF'
        rippleOpacity={0.55}
        rippleDuration={1000}
        rippleSize={1000}
        rippleCentered={false}
    >
      <Text style={styles.appButtonTextLogin}>Log Out</Text>
    </Ripple>
);

export const LoginActionButton = ({ onPress }) => (
    <Ripple 
        onPress={onPress} 
        style={ [styles.appButtonContainerLogin, { marginTop: 20 }] }
        rippleColor='#00B2FF'
        rippleOpacity={0.55}
        rippleDuration={1000}
        rippleSize={1000}
        rippleCentered={false}
    >
      <Text style={styles.appButtonTextLogin}>Log In</Text>
    </Ripple>
);

export const SignUpActionButton = ({ onPress }) => (
    <Ripple 
        onPress={onPress} 
        style={ [styles.appButtonContainerLogin, { marginTop: 20 }] }
        rippleColor='#00B2FF'
        rippleOpacity={0.55}
        rippleDuration={1000}
        rippleSize={1000}
        rippleCentered={false}
    >
      <Text style={styles.appButtonTextLogin}>Sign me Up</Text>
    </Ripple>
);

export const GoogleButton = () => (
    <TouchableHighlight style={ [styles.appButtonContainerSignUp, { marginBottom: 20, backgroundColor: '#FFE0E0' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', position: 'relative' }}>
            <GoogleIcon style={{ height: 20, width: 20, position: 'absolute', left: -10 }} />
            <Text style={styles.OauthButtonGoogle}>Continue with Google</Text>
        </View>
    </TouchableHighlight>
)

export const FacebookButton = () => (
    <TouchableHighlight style={ [styles.appButtonContainerSignUp, { backgroundColor: '#D2E3FC' }] }>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', position: 'relative' }}>
            <FacebookIcon style={{ height: 20, width: 20, position: 'absolute', left: -10 }} />
            <Text style={styles.OauthButtonFacebook}>Continue with Facebook</Text>
        </View>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    // ...
    appButtonContainerLogin: {
        elevation: 0,
        backgroundColor: "#000000",
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 50,
    },
    appButtonContainerSignUp: {
        elevation: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 50,
    },
    appButtonTextLogin: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "normal",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    appButtonTextSignUp: {
        fontSize: 15,
        color: "#000000",
        fontWeight: "normal",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    OauthButtonGoogle: {
        fontSize: 15,
        color: "#000000",
        fontWeight: "normal",
        alignSelf: "center"
    },
    OauthButtonFacebook: {
        fontSize: 15,
        color: "#000000",
        fontWeight: "normal",
        alignSelf: "center",
    }
  });