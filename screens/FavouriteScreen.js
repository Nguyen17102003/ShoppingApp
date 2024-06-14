import React, {useState, useEffect, useContext} from "react";
import { ScrollView, Dimensions, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audiowide_400Regular, useFonts } from "@expo-google-fonts/audiowide";
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import SongCard from "../items/SongCards";
import songs from "../data/music";
import { LinearGradient } from "expo-linear-gradient";
import { darkMode, lightMode } from "../misc/helper";
import { SongContext } from "../misc/useSongs";
const {width} = Dimensions.get('window');
const FavouriteScreen = ({navigation}) => {
    let [song, setSong] = useState([]);
    const {isEnabled} = useContext(SongContext);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
          });
      return unsubscribe;
    }, [navigation]);
    const getData = () => {
        let songList = [];
        for(let i = 0; i < songs.length; i++)
        {
            songList.push(songs[i]);
        }
        setSong(songList);
    }
    let [fontLoaded] = useFonts({
        Audiowide_400Regular,
        Montserrat_700Bold, 
    });
    if (!fontLoaded) {
        return null;
    }
    
    return (
        <><View style = {{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'}}>
            <LinearGradient colors = {isEnabled ? darkMode : lightMode} style = {{width: '100%', height: '100%'}}></LinearGradient>
        </View>
        <View style={{ flex: 1 }}>
                <View>
                    <View style = {style.greetContainer}>
                    <Text style = {isEnabled ? style.greeting : style.greetingLight}>
                        Library
                    </Text>
                    </View>
                    
                </View>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    <View>
                        {song.map(data => { return (
                        <TouchableOpacity key={data.id} onPress={() => navigation.navigate('Detail', {data: data})}>
                            <SongCard data={data}></SongCard>
                            </TouchableOpacity>)})}
                    </View>
                </ScrollView>
            </View></>
    )
    
}

const style = StyleSheet.create({
    greetContainer: {
        marginTop: 20,
        width: width,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    greeting:{
        marginLeft: '5%',
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
        fontSize: 30,
    },
    greetingLight: {
        marginLeft: '5%',
        fontFamily: 'Montserrat_700Bold',
        color: 'black',
        fontSize: 30,
    }
})
export default FavouriteScreen;