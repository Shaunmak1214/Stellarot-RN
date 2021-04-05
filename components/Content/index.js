import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, FlatList, Image, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';
import moment from "moment";
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import styles from './style';
import { set } from 'react-native-reanimated';

export default function content( props ) {

    const [allTab, setAllTab] = useState(false)
    const [spaceXTab, setSpaceXTab] = useState(false)
    const [NasaTab, setNasaTab] = useState(false)
    const [otherTab, setOtherTab] = useState(false)

    const setAll = () => {
        setAllTab(true)
        setSpaceXTab(false)
        setNasaTab(false)
        setOtherTab(false)
    }
    const setSpaceX = () => {
        setAllTab(false)
        setSpaceXTab(true)
        setNasaTab(false)
        setOtherTab(false)
    }
    const setNasa = () => {
        setAllTab(false)
        setSpaceXTab(false)
        setNasaTab(true)
        setOtherTab(false)
    }
    const setOther = () => {
        setAllTab(false)
        setSpaceXTab(false)
        setNasaTab(false)
        setOtherTab(true)
    }

    const Sticky = () => {
        return(
            <View style={styles.sticky}>
                <TouchableOpacity 
                    onPress={ setAll }
                    style={ allTab ? styles.optionSelected : styles.option }
                >
                    <Text style={styles.optionText}>All</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ setSpaceX } style={[styles.option , spaceXTab ? {borderColor: '#00B2FF' } : {borderColor: '#EDF5FD'}]}>
                    <Text style={styles.optionText}>Space X</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ setNasa } style={[styles.option , NasaTab ? {borderColor: '#00B2FF' } : {borderColor: '#EDF5FD'}]}>
                    <Text style={styles.optionText}>Nasa</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ setOther } style={[styles.option , otherTab? {borderColor: '#00B2FF' } : {borderColor: '#EDF5FD'}]}>
                    <Text style={styles.optionText}>Others</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const NewsList = () => {

        const [data, setData] = useState([])

        const Item = ({ title, author, publication, imageUrl, summary }) => (
            <TouchableOpacity onPress={()=>props.modalize(title, author, publication, imageUrl, summary)}>
                <View style={styles.item}>
                    <Image
                        style={{width: '45%' , height: 100,  zIndex: 1000, borderRadius: 8}}
                        source={{ uri: `${imageUrl}` }}
                    />
                    <View style={styles.detailsContainer}>
                        <Text style={ [styles.title, {fontFamily: 'Poppins'}]}>{title}</Text>
                        <Text style={styles.author}>{author}</Text>
                        <Text style={styles.publication}>{moment(publication).format("MM-DD-YYYY")}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );

        const renderItem = ({ item }) => (
            <Item style={styles.itemContainer} title={item.title} author={item.newsSite} publication={item.publishedAt} imageUrl={item.imageUrl} summary={item.summary} />
        );

        useEffect(() => {

            axios.get('https://space-bot-2021.herokuapp.com/v1/snanews/10/20')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(`error calling API ${err}`)
            })
    
        },[])

        return(
            <FlatList
                data={data}
                renderItem={renderItem}
                contentContainerStyle={styles.flatList}
            />
        )   
    }

    return (
        <>
            <Sticky />
            <NewsList style={styles.newListContainer}/>
        </>
    )
}
