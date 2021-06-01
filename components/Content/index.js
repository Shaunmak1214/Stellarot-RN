import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, FlatList, Image, TouchableOpacity,  ActivityIndicator} from 'react-native';
import axios from 'axios';
import moment from "moment";
import styles from './style';

export default function content( props ) {

    
    var spaceXKeywords = ['SpaceX', 'spacex', 'Falcon 9', 'Starlink', 'Star Link', 'Elon Musk', "ElonMusk", "Elon"]

    const NewsList = () => {

        const [allTab, setAllTab] = useState(true)
        const [spaceXTab, setSpaceXTab] = useState(false)
        const [NasaTab, setNasaTab] = useState(false)
        const [otherTab, setOtherTab] = useState(false)
        const [loading, setLoading] = useState(false);

        const [data, setData] = useState([])
        const [spaceXData, setSpaceXData] = useState([])
        const [nasaData, setNasaData] = useState([])
        const [otherData, setOtherData] = useState([])
        const [pages, setPages] = useState(31);

        useEffect(() => {

            axios.get(`https://stellarot.herokuapp.com/v1/snanews/10/20`)
            .then((res) => {
                setData(res.data)
                var spaceXArr = []
                var NasaArr = []
                var OtherArr = []
                res.data.forEach(element => {
                    if(element.title.includes('SpaceX') || element.title.includes('Starlink') || element.summary.includes('SpaceX') || element.summary.includes('Starlink')){
                        spaceXArr.push(element)
                    }else if(element.title.includes('NASA') || element.summary.includes('NASA') || element.newsSite.includes('NASA')){
                        NasaArr.push(element)
                    }else{
                        OtherArr.push(element)
                    }
                    
                });
                setSpaceXData(spaceXArr)
                setNasaData(NasaArr)
                setOtherData(OtherArr)
            })
            .catch((err) => {
                console.log(`error calling API ${err}`)
            })
    
        },[])

        const loadMoreAllTab = () => {
            setLoading(true)
            console.log('loadin more')
            setPages( pages + 22 )
            console.log(`pages increments ${pages}`)
            axios.get(`https://stellarot.herokuapp.com/v1/snanews/${pages}/20`)
            .then((res) => {
                setData([...data, ...res.data])
                var spaceXArr = []
                var NasaArr = []
                var OtherArr = []
                res.data.forEach(element => {
                    if(element.title.includes('SpaceX') || element.title.includes('Starlink') || element.summary.includes('SpaceX') || element.summary.includes('Starlink')){
                        spaceXArr.push(element)
                    }else if(element.title.includes('NASA') || element.summary.includes('NASA') || element.newsSite.includes('NASA')){
                        NasaArr.push(element)
                    }else{
                        OtherArr.push(element)
                    }
                    
                });
                setSpaceXData([...spaceXData, ...spaceXArr])
                setNasaData([...nasaData, ...NasaArr])
                setOtherData([...otherData, ...OtherArr])
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
        }

        const renderFooter = () => {
            return (
                // Footer View with Loader
                <View style={styles.footer}>
                {loading ? (
                    <ActivityIndicator
                    color="#00B2FF"
                    style={{margin: 15}} />
                ) : null}
                </View>
            );
        };

        const Sticky = () => {
        
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

        const Item = ({ title, author, publication, imageUrl, summary }) => (
            <TouchableOpacity onPress={()=>props.modalize(title, author, publication, imageUrl, summary)}>
                <View style={styles.item}>
                    <View style={{ width: '35%', maxHeight: 95 }} >
                        <Image
                            style={{width: '100%' , height: '100%',  zIndex: 1000, borderRadius: 8}}
                            source={{ uri: `${imageUrl}` }}
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={ [styles.title, {fontFamily: 'Poppins', color: '#000'}]}>{title}</Text>
                        <View style={ styles.bottomInfo }>
                            <Text style={styles.author}>{author}</Text>
                            <Text style={styles.publication}>{moment(publication).format("MM-DD-YYYY")}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );

        const renderItem = ({ item }) => (
            <Item style={styles.itemContainer} title={item.title} author={item.newsSite} publication={item.publishedAt} imageUrl={item.imageUrl} summary={item.summary} />
        );

        if(allTab){
            return(
                <>
                    <Sticky />
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.flatList}
                        onEndReached={loadMoreAllTab}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </>
                ) 
        }else if(spaceXTab){
            return(
                <>
                <Sticky />
                <FlatList
                        data={spaceXData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.flatList}
                    />
                </>
            )
        }else if(NasaTab){
            return(
                <>
                <Sticky />
                <FlatList
                        data={nasaData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.flatList}
                    />
                </>
            )
        }else if(otherTab){
            return(
                <>
                <Sticky />
                <FlatList
                        data={otherData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.flatList}
                    />
                </>
            )
        }
          
    }

    return (
        <>
            {/* <Sticky /> */}
            {/* <TopBar /> */}
            <NewsList style={styles.newListContainer}/>
        </>
    )
}
