import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width - 60;
import { LinearGradient } from 'expo-linear-gradient';

const potd = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`https://stellarot.herokuapp.com/v1/pod`)
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.log(`error calling API ${err}`)
        })
    },[])

    return (
        <View
            style={{ marginBottom: 20, position: 'relative', flex: 1, flexDirection: 'column', alignItems: 'center' }}
        >
            <TouchableOpacity style={{ width: windowWidth, height: 180, flex: 1, display: 'flex', alignItems: 'center', marginBottom: 20, position: 'relative' }}>
                <LinearGradient colors={['transparent', '#000000']} useAngle={true} angle={170} angleCenter={{x:0.5,y:0.5}} style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 10 , borderRadius: 15}}></LinearGradient>
                <Image
                    style={{width: '100%', height: '100%', borderRadius: 15, opacity: 0.70}}
                    source={{ uri: `https://cdn.mos.cms.futurecdn.net/kyg2xwuyrtViU3MpyAeHeP.jpg` }}
                />
                <Text style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 100, fontSize: 25, color: '#A7A7A8' }}>Picture of The Day</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: windowWidth, height: 180, flex: 1, display: 'flex', alignItems: 'center', marginBottom: 20, position: 'relative' }}>
            <LinearGradient colors={['transparent', '#000000']} useAngle={true} angle={170} angleCenter={{x:0.5,y:0.5}} style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 10 , borderRadius: 15}}></LinearGradient>
                <Image
                    style={{width: '100%', height: '100%', borderRadius: 15, opacity: 0.70}}
                    source={{ uri: `${data.url}` }}
                />
                <Text style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 100, fontSize: 25, color: '#A7A7A8' }}>Mars Today</Text>
            </TouchableOpacity>
        </View>
        
    )
}

export default potd
