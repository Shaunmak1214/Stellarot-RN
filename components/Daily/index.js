import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import axios from 'axios';
import moment from "moment";
import styles from './style';
import Dot from '../../assets/images/dot.svg';
/* import AnimatedLoader from "react-native-animated-loader"; */
import ImageBlurLoading from 'react-native-image-blur-loading'

import * as Font from 'expo-font';

const nuaDaily = ( props ) => {

    const [data, setData] = useState([])
    const [loaded, setLoad] = useState(false)

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
                    source={{ uri: `${imageUrl}` }}
                    style={{width: 200, height: 125, zIndex: 1000, borderRadius: 8}}
                />
                {/* <Image
                    style={{width: 260, height: 200, zIndex: 1000, borderRadius: 8, marginTop: 10}}
                    source={{ uri: `${imageUrl}` }}
                /> */}
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

    /* const AppLoading  = () => {
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
    } */

    if (!loaded) {
        return (
            <View style={[ styles.container , {flex: 1, justifyContent: "center", padding: 10, width: '100%'} ]} >
                <ActivityIndicator 
                    size="large" 
                    color='#00B2FF'
                    style={{ width: '100%', paddingHorizontal: 160, paddingVertical: 157 }}
                />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Dot style={styles.dot} />
                    <Text style={ [styles.PrimaryText , {fontFamily: 'Quicksand', fontWeight: '600'}]}>NUA Daily</Text>
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
