import React, {useEffect} from "react";
import {
    Dimensions,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { Audiowide_400Regular, useFonts } from "@expo-google-fonts/audiowide";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";
const {width} = Dimensions.get('window');
export default SongCard = ({data}) => {
    let [fontsLoaded] = useFonts({
        Audiowide_400Regular,
        Montserrat_400Regular,
      });
      if (!fontsLoaded) {
        return null;
      }
    return(
        <View style = {style.card} elevation = {5}>
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
    card: {
        shadowOffset: {width: -1, height: 1},
        shadowRadius: 10,
        shadowColor: '#46198a',
        width: width - 10,
        alignSelf: 'center',
        height: 100,
        borderRadius: 10,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginBottom: 5,
    },
    title: {
        fontFamily: 'Audiowide_400Regular',
        fontSize: 20,
        color: '#d9ffde',
        textShadowOffset: {width: -1, height: -1},
        textShadowRadius: 10,
    },
    artist:{
        fontFamily: 'Montserrat_400Regular',
        fontSize: 15,
        color: 'white',
    },
    image: {
        width: 50,
        height: 50,
        margin: 25,
        borderRadius: 5,
    },
    discription: {
        marginTop: 25,
        flexDirection: 'column',
        alignItems: 'flex-start',
    }
})