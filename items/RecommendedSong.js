import React, {useContext} from "react";
import {
    Dimensions,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { Audiowide_400Regular, useFonts } from "@expo-google-fonts/audiowide";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { SongContext } from "../misc/useSongs";
export default RecommendedSong = ({data, navigation}) => {
    const {isEnabled} = useContext(SongContext);
    let [fontsLoaded] = useFonts({
        Audiowide_400Regular,
        Montserrat_400Regular,
      });
      if (!fontsLoaded) {
        return null;
      }
    return(
        <View style = {style.card}>
        <View style = {[style.container, isEnabled? {backgroundColor: 'yellow'} : {backgroundColor: '#1d1d70'}]}></View>
        <Image 
             source = {data.artwork}
             style = {style.image}></Image>
        <View style = {style.discription}>
            <Text style = {style.title}> {data.title} </Text>
            <Text style = {style.artist}> {data.artist} </Text>
        </View>
            </View>
    )
}

const style = StyleSheet.create({
    container:{
        position: 'absolute',
        width: 220,
        height: 220,
    },
    card: {
        width: 200,
        margin: 20,
        height: 220,
        borderRadius: 10,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        marginBottom: 5,
    },
    title: {
        textShadowColor: 'black',
        textShadowOffset: {width: -1, height: -1},
        textShadowRadius: 10,
        fontFamily: 'Audiowide_400Regular',
        fontSize: 10,
        color: '#e9f57a',
    },
    artist:{
        fontFamily: 'Audiowide_400Regular',
        textShadowColor: 'black',
        textShadowOffset: {width: -1, height: -1},
        textShadowRadius: 10,
        fontSize: 15,
        color: '#e9f57a',
    },
    image: {
        position: 'absolute',
        width: 200,
        height: 200,
    },
    discription: {
        marginLeft: 10,
        marginTop: 150,
        flexDirection: 'column',
        alignItems: 'flex-start',
    }
})