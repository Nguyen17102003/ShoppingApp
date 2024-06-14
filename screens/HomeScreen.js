import React, {useState, useEffect, useContext} from "react";
import { darkMode, lightMode } from "../misc/helper";
import songs from "../data/music";
import RecommendedSong from "../items/RecommendedSong";
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useFonts } from "@expo-google-fonts/lobster/useFonts";
import { LinearGradient } from "expo-linear-gradient";
import { SongContext } from "../misc/useSongs";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
const {width} = Dimensions.get('window');
var greet;
var myDate = new Date();
var hours = myDate.getHours();
const greeting = () => {
    if (hours < 12)
        greet =  "morning";
    else if (hours >= 12 && hours <= 17)
        greet = "afternoon";
    else if (hours >= 17 && hours <= 24)
        greet = "evening";
}
greeting();
export default function HomeScreen({navigation}){
    let [song, setSong] = useState([]);
    const {firstname, lastname, isEnabled} = useContext(SongContext);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
          });
      return unsubscribe;
    });
    const getData = () => {
        let songList = [];
        for(let i = 0; i < songs.length; i++)
        {
            songList.push(songs[i]);
        }
        setSong(songList);
    }
    const greetIcon = () => {
        if(greet === "morning") return "ios-sunny-outline";
        if(greet === "afternoon") return "ios-partly-sunny-outline";
        return "moon";
    }
    let [fontLoaded] = useFonts({
        Montserrat_700Bold,
    });
    if (!fontLoaded) {
        return null;
    } 
    return(
        <><View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%' }}>
            <LinearGradient colors={isEnabled ? darkMode : lightMode} style={{ width: '100%', height: '100%' }}></LinearGradient>
        </View>
        <View style={style.background}>
                <View style={style.greetContainer}>
                    <Ionicons name={greetIcon()} size={30} color={isEnabled ? 'white' : 'black'} />
                    <Text style={isEnabled ? style.greeting : style.greetingLight}>Good {greet}</Text>
                    <View style={style.notify}>
                    <View style = {{marginHorizontal: 10, height: 200, width: 150, marginTop: 170, flexDirection: 'row'}}>
                    <MenuProvider>
                        <Menu>
                        <MenuTrigger>
                            <Ionicons name="ios-settings-outline" size={30} color={isEnabled ? 'white' : 'black'}></Ionicons>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption 
                            onSelect={() => alert('You have clicked this')}
                            text = "Setting"></MenuOption>
                            <MenuOption
                            onSelect={() => navigation.navigate('Profile')}
                            text = "Profile"></MenuOption>
                        </MenuOptions>
                        </Menu>
                         </MenuProvider>
                         <TouchableOpacity style = {{marginRight: 60, height: 30, width: 30}}>
                            <Ionicons name="notifications-outline"  size={30} color={isEnabled ? 'white' : 'black'}></Ionicons>
                        </TouchableOpacity>
                    </View>
                    
                    </View>
                </View>
                <View style = {{marginTop: 50}}>
                    <Text style={isEnabled ? style.welcome : style.welcomeLight}>
                        Recommended for {firstname} {lastname}
                    </Text>
                    <ScrollView horizontal = {true} style={{marginTop: 50}}>
                            {song.map(data => { return(
                                <TouchableOpacity
                                key={data.id}
                                onPress={() => navigation.navigate('Detail', {data: data})}>
                            <RecommendedSong data={data}></RecommendedSong>
                            </TouchableOpacity>
                        )})}
                    </ScrollView>
                </View>
            </View>
            </>
    )
}

const style = StyleSheet.create({
    background:{
        flex: 1,
        display: 'flex',
    },
    welcome:{
        position: 'absolute',
        marginLeft: 10,
        marginVertical: 20,
        color: 'white',
        fontSize: 30,
        fontFamily: 'Montserrat_700Bold',
    },
    welcomeLight: {
        position: 'absolute',
        marginLeft: 10,
        marginVertical: 20,
        color: 'black',
        fontSize: 30,
        fontFamily: 'Montserrat_700Bold',
    },
    notify: {
        marginLeft: '35%',
        flexDirection: 'row',
        display: 'flex',
    },
    greetContainer: {
        marginLeft: 10,
        marginTop: 30,
        width: width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    greeting:{
        marginLeft: 10,
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
        fontSize: 30,
    },
    greetingLight: {
        marginLeft: 10,
        fontFamily: 'Montserrat_700Bold',
        color: 'black',
        fontSize: 30,
    }
})
