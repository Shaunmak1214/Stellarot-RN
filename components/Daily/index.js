import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, FlatList, Image, ImageBackground, ScrollView, SafeAreaView} from 'react-native';
import styles from './style';
import axios from 'axios';
import moment from "moment";

const image = { uri: "https://www.teslarati.com/wp-content/uploads/2021/04/Starship-Boca-Chica-033121-NASASpaceflight-bocachicagal-SN15-progress-1-c.jpg" };

function nuaDaily() {

    const Item = ({ title, author, publication, imageUrl }) => (
        
        <View style={styles.item}>
            <Image
                style={{width: 210, height: 200, zIndex: 1000, borderRadius: 8, marginTop: 10}}
                source={{ uri: `${imageUrl}` }}
            />
            {/* <ImageBackground source={ image } style={{width: 210, height: 200}}>

            </ImageBackground> */}
            <Text style={styles.title}>{title}</Text>
            <View style={styles.bottomBar}>
                <Text style={styles.author}>{author}</Text>
                <Text style={styles.publication}>{moment(publication).format("MM-DD-YYYY")}</Text>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} author={item.newsSite} publication={item.publishedAt} imageUrl={item.imageUrl} />
    );

    const [data, setData] = useState([])

    useEffect(() => {

        axios.get('https://space-bot-2021.herokuapp.com/v1/snanews')
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.log(`error calling API ${err}`)
        })

    },[])

    return (
        <View style={styles.container}>
            <Text style={styles.PrimaryText}>NUA Daily</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={data}
                renderItem={renderItem}
            />
        </View>
    )
}

export default nuaDaily;
