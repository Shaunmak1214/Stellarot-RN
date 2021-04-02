import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import styles from './style';
import { useFonts } from 'expo-font';
import axios from 'axios';
import moment from "moment";

function nuaDaily() {

    const Item = ({ title, name, publication, imageUrl }) => (

        <View style={styles.item}>
            <Image
                style={{width: 210, height: 200}}
                source={{ uri: "imgsrc.hubblesite.org/hvi/uploads/story/thumbnail/1394/low_STScI-H-p2105a-t-400x400.png" }}
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.publication}>{moment(publication).format("MM-DD-YYYY")}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.news_id} name={item.name} publication={item.publication} imageUrl={item.thumbnail} />
    );

/*     const [newsId, setNewsId] = useState([]);
    const [name, setName] = useState([]); */
    const [data, setData] = useState([]);

/*     let allNewsId = []
    let allNewsName = [] */

    useEffect(() => {

        axios.get('https://space-bot-2021.herokuapp.com/v1/news')
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.log(`error calling API ${err}`)
        })

    },[])

    const [loaded] = useFonts({
        Quicksand: require('../../assets/fonts/Quicksand-Regular.ttf'),
    });

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
