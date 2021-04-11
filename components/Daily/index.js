import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, FlatList, Image, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import moment from "moment";
import styles from './style';
import Dot from '../../assets/images/dot.svg';
import AnimatedLoader from "react-native-animated-loader";
import ImageBlurLoading from 'react-native-image-blur-loading'

import * as Font from 'expo-font';

const nuaDaily = ( props ) => {

    const [fontLoaded, setFontLoaded] = useState(false);
    const fonts = {
      'Quicksand': require('../../assets/fonts/Quicksand-Regular.ttf'),
      'Poppins': require('../../assets/fonts/Poppins-Regular.ttf')
    }

    useEffect(() => {
        (async () => {
            try {
                await Font.loadAsync(fonts);
                setFontLoaded(true);
                console.log('fontloaded')
            } catch (err) {
                console.log(err);
            }

        })();
    }), [fonts];

    const [data, setData] = useState([])
    const [loaded, setLoad] = useState(false)
    useEffect(() => {

        axios.get(`https://stellarot.herokuapp.com/v1/snanews/0/10`)
        .then((res) => {
            setData(res.data)
            setLoad(true)
        })
        .catch((err) => {
            console.log(`error calling API ${err}`)
        })
    
    },[])

    const Item = ({ title, author, publication, imageUrl, summary }) => (
        
        <View style={styles.item}>
            <TouchableOpacity onPress={()=>props.modalize(title, author, publication, imageUrl, summary)}>
                <ImageBlurLoading
                    withIndicator
                    thumbnailSource={{ uri: 'https://picsum.photos/id/1/50/50' }}
                    source={{ uri: `${imageUrl}` }}
                    style={{width: 260, height: 200, zIndex: 1000, borderRadius: 8, marginTop: 10}}
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

    const AppLoading  = () => {
        return(
            <AnimatedLoader
                visible={true}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../../assets/loader/black-spinner.json")}
                animationStyle={styles.lottie}
                speed={1}
            >
            </AnimatedLoader>
        )
    }

    if (!loaded) {
        return <AppLoading />;
    } else {
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
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    style={styles.flatList}
                />
            </View>
        )
    }
}

export default nuaDaily;
