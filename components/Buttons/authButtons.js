import React from 'react';
import { View, Button, StyleSheet, TouchableHighlight, Text } from "react-native";

export const LoginButton = ({ onPress, title }) => (
    <TouchableHighlight onPress={onPress} style={styles.appButtonContainerLogin}>
      <Text style={styles.appButtonTextLogin}>Log In</Text>
    </TouchableHighlight>
);

export const SignUpButton = ({ onPress, title }) => (
    <TouchableHighlight onPress={onPress} style={styles.appButtonContainerSignUp}>
      <Text style={styles.appButtonTextSignUp}>Sign Up</Text>
    </TouchableHighlight>
);

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
      }
  });