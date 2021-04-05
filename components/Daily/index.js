import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, FlatList, Image, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import moment from "moment";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import styles from './style';
import Dot from '../../assets/images/dot.svg';

const nuaDaily = ( props ) => {

    const [loaded] = useFonts({
        Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
        Quicksand: require('../../assets/fonts/Quicksand-Regular.ttf')
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

        if(moment(item.publication).isSame(moment(), 'day')){
            return <Item title={item.title} author={item.newsSite} publication={item.publishedAt} imageUrl={item.imageUrl} summary={item.summary} />
        }else{
            // return <Item title={item.title} author={item.newsSite} publication={item.publishedAt} imageUrl={item.imageUrl} summary={item.summary} />
        }
        
    };

    const [data, setData] = useState([])

    useEffect(() => {

        axios.get('https://space-bot-2021.herokuapp.com/v1/snanews/0/10')
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.log(`error calling API ${err}`)
        })

    },[])

    // if (!loaded) {
    //     return <AppLoading />;
    // } else {
        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Dot style={styles.dot} />
                    <Text style={ [styles.PrimaryText , {fontFamily: 'Quicksand'}]}>NUA Daily</Text>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={data}
                    renderItem={renderItem}
                    style={styles.flatList}
                />
            </View>
        )
    // }
}

export default nuaDaily;
