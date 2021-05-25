import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, FlatList, Image, TouchableOpacity,  ActivityIndicator} from 'react-native';
import axios from 'axios';
import moment from "moment";
import styles from './style';

export default function searchList(props){

    const [data, setData] = useState([])
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState(20);

    useEffect(() => {

        if(props.search.search === ""){
            setData([])
        }else{
            axios.get(`https://api.spaceflightnewsapi.net/v3/articles?title_contains=${props.search.search}&_limit=${pages}`)
            .then((res) => {
                setData(res.data)
                setSearched(true)
            })
            .catch((err) => {
                console.log(err)
            })
        }

    }, [props.search])

    const loadMoreAllTab = () => {
        setLoading(true)
        console.log('loadin more')
        setPages( pages + 22 )
        console.log(`pages increments ${pages}`)
        axios.get(`https://api.spaceflightnewsapi.net/v3/articles?title_contains=${props.search.search}&_limit=${pages}`)
        .then((res) => {
            setData(res.data)
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

    const Item = ({ title, author, publication, imageUrl, summary }) => (
        <TouchableOpacity onPress={()=>props.modalize(title, author, publication, imageUrl, summary)}>
            <View style={styles.item}>
                <Image
                    style={{width: '45%' , height: 100,  zIndex: 1000, borderRadius: 8}}
                    source={{ uri: `${imageUrl}` }}
                />
                <View style={styles.detailsContainer}>
                    <Text style={ [styles.title, {fontFamily: 'Poppins', color: '#000', fontSize: 14}]}>{title}</Text>
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

    if(data.length > 0){
        return(
            <>
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
    }else{
        return(
            <View style={styles.notfound} > 
                <Text style={ [styles.title, {fontFamily: 'Poppins', color: '#787878', fontSize: 12}]}>Nothing Found</Text>
            </View>
        )
    }
}