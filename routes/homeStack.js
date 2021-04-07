import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import NuaDaily from '../components/Daily';
import Content from '../components/Content';
import Details from '../components/Details';

const HomeStackScreen = () => {

    const [title, setTitle] = useState([])
    const [author, setAuthor] = useState([])
    const [publication, setPublication] = useState([])
    const [imageUrl, setImageUrl] = useState([])
    const [summary, setSummary] = useState([])

    const modalizeRef = useRef(null);
    const onOpen = (title, author, publication, imageUrl, summary) => {
        setTitle(title)
        setAuthor(author)
        setPublication(publication)
        setImageUrl(imageUrl)
        setSummary(summary)
        modalizeRef.current?.open();
    };

    return (
        <>
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.container}>
            <Header />
            <NuaDaily modalize={onOpen} style={styles.nuadaily} />
            <Content modalize={onOpen} />
            </View>
        </ScrollView>
        <Modalize 
            snapPoint={650} 
            modalTopOffset={10}
            ref={modalizeRef} 
            style={{ width:'100%', alignItems:'center', justifyContent: 'center', padding: 20, bottom: 50, position:'absolute' }}
        >
            <View style={{padding: 20}}>
            <Image
                style={{width: 350, height: 200, zIndex: 1000, borderRadius: 8, marginTop: 10}}
                source={{ uri: `${imageUrl}` }}
            />
            <Text style={styles.modalTitle}>{title}</Text>

            <View style={styles.detailsBar}>
                <Text style={styles.modalAuthor}>{author}</Text>
                <Text style={styles.modalPublication}>{moment(publication).format("MM-DD-YYYY")}</Text>
            </View>

            <Text style={styles.modalSummary}>{summary}</Text>
            </View>
        </Modalize>
        </SafeAreaView>

        {/* <Modal title={title} author={author} publication={publication} imageUrl={imageUrl} summary={summary} /> */}
        </>
    )
}

const screens = {
    Home: {
      screen: HomeStackScreen
    },
    Details:{
      screen: Details
    }
  }
  
  const HomeStack = createStackNavigator(screens);
  
  export default createAppContainer(HomeStack);