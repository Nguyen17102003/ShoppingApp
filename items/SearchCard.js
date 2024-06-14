import React, {useEffect} from "react";
import {
    TouchableOpacity,
    Dimensions,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { Audiowide_400Regular, useFonts } from "@expo-google-fonts/audiowide";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";
const {width} = Dimensions.get('window');

export default SearchCard = ({data}) => {
    
    let [fontsLoaded] = useFonts({
        Audiowide_400Regular,
        Montserrat_400Regular,
      });
      if (!fontsLoaded) {
        return null;
      }
    return(
        <TouchableOpacity style = {style.card}>
            <Image 
            resizeMode= 'cover'
             source = {data.image}
             style = {style.image}>
            </Image>
            <View style={style.discription}>
                <Text style = {style.title}> {data.title} </Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    card: { 
        width: '48%',
        margin: 5,
        height: 150,
    },
    title: {
        textShadowColor: 'black',
        textShadowOffset: {width: -1, height: -1},
        textShadowRadius: 10,
        fontFamily: 'Audiowide_400Regular',
        fontSize: 30,
        color: '#e9f57a',
    },
    image: {
        width: '100%',
        borderRadius: 10,
        height: '100%',
    },
    discription: {
        position: 'absolute',
        bottom: 10,
    }
})