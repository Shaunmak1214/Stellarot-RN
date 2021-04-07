import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, FlatList, Image, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import moment from "moment";
import styles from './style';
import Dot from '../../assets/images/dot.svg';

import {
    useFonts,
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  } from '@expo-google-fonts/quicksand';

const nuaDaily = ( props ) => {

    const [data, setData] = useState([])
    useEffect(() => {

        axios.get(`https://stellarot.herokuapp.com/v1/snanews/0/10`)
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.log(`error calling API ${err}`)
        })
    
    },[])

    let [fontsLoaded] = useFonts({
        Quicksand_300Light,
        Quicksand_400Regular,
        Quicksand_500Medium,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
    });

    const Item = ({ title, author, publication, imageUrl, summary }) => (
        
        <View style={styles.item}>
            <TouchableOpacity onPress={()=>props.modalize(title, author, publication, imageUrl, summary)}>
                <Image
                    style={{width: 210, height: 200, zIndex: 1000, borderRadius: 8, marginTop: 10}}
                    source={{ uri: `${imageUrl}` }}
                />
                <Text style={ [styles.title, {fontFamily: 'Poppins'}]}>{title}</Text>
                <View style={styles.bottomBar}>
                    <Text style={styles.author}>{author}</Text>
                    <Text style={styles.publication}>{moment(publication).format("MM-DD-YYYY hh:mm")}</Text>
                </View>
            </TouchableOpacity>
        </View>
        
    );

    const renderItem = ({ item }) => {

        if(moment(item.publication).diff(moment(), 'days') < 1){
            console.log('in this day')
            return (<Item title={item.title} author={item.newsSite} publication={item.publishedAt} imageUrl={item.imageUrl} summary={item.summary} />)
        }else{
            console.log('nope')
            // return <Item title={item.title} author={item.newsSite} publication={item.publishedAt} imageUrl={item.imageUrl} summary={item.summary} />
        }
        
    };

    // if (!loaded) {
    //     return <AppLoading />;
    // } else {
        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Dot style={styles.dot} />
                    <Text style={ [styles.PrimaryText , {fontFamily: 'Inter_900Black'}]}>NUA Daily</Text>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    style={styles.flatList}
                />
            </View>
        )
    // }
}

export default nuaDaily;
