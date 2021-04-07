import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, Image,  TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { render } from 'react-dom';

const modalize = (props) => {

    const modalizeRef = useRef(null);

    return (
        <Modalize snapPoint={650} modalTopOffset={10} ref={modalizeRef} style={{ width: '100%',   alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <View style={{padding: 20}}>
            <Image
                style={{width: 350, height: 200, zIndex: 1000, borderRadius: 8, marginTop: 10}}
                source={{ uri: `${imageUrl}` }}
            />
            <Text style={styles.modalTitle}>{title}</Text>
    
            <View style={styles.detailsBar}>
                <Text style={styles.modalAuthor}>{author}</Text>
                <Text style={styles.modalPublication}>{moment(publication).format("MM-DD-YYYY")}</Text>
            </View>
    
            <Text style={styles.modalSummary}>{summary}</Text>
            </View>
        </Modalize>
    )
}

export default modalize
