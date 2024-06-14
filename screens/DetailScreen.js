import React, {useState, useContext} from "react";
import { NativeBaseProvider, Actionsheet, useDisclose } from "native-base";
import PlayerButton from "../component/PlayerButton";
import { FontAwesome, Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import { useFonts } from "expo-font";
import { DynaPuff_500Medium } from "@expo-google-fonts/dynapuff";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import {SongContext} from "../misc/useSongs";
import { convertTime } from "../misc/helper";
import { darkMode, lightMode } from "../misc/helper";
import { home, dntu } from "../misc/specific";
import { currentUser } from "./LoginScreen";
const {width} = Dimensions.get('window');
const Detail = ({route, navigation}) => {
    const data = route.params.data;
    const id = data.id;
    const url = data.url;
    const [isPlaying, setPlay] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const {sound, setSound, currentID, setCurrentID, isEnabled} = useContext(SongContext);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const handleAudio = async () => {
    if(currentID === 0)
    {
        setCurrentID(id);
    }
    if(currentID !== 0 && currentID !== id)
    {
        sound.unloadAsync();
        setCurrentID(id);
    }
    if (!isLoaded) {
      const { sound, status } = await Audio.Sound.createAsync(url);
      setSound(sound);
      setLoaded((current) => !current);
      sound.setOnPlaybackStatusUpdate(status => {
        setCurrentPosition(status.positionMillis);
        setDuration(status.durationMillis);
      });
      sound.setIsLoopingAsync(true);
    }
    if (isLoaded && !isPlaying) {
        await sound.playFromPositionAsync(currentPosition);
        setPlay((current) => !current);
    }
    if (isLoaded && isPlaying) {
        await sound.pauseAsync();
        setPlay((current) => !current);
    }
    }
    const handle = () => {
        handleAudio();
        if(isLoaded)
        {
            onOpen();
        }
    }
    const{
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    let [fontLoaded] = useFonts({
        DynaPuff_500Medium,
        Pacifico_400Regular,
    });
    if (!fontLoaded) {
        return null;
    } 
    const addFav = async () => {
        const res = await fetch(`${dntu}/${currentUser}`, {
            method: 'PATCH'
        })
        const resJson = await res.json();
        return await resJson.Favourite.push(data);
    }
    return(
        <>
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%' }}>
            <LinearGradient colors={isEnabled ? darkMode : lightMode} style={{ width: '100%', height: '100%' }}></LinearGradient>
        </View>
        <View style = {style.imageContainer}>
            <Image
            source = {data.artwork}
            resizeMode = 'cover'
            blurRadius={10}
            style = {style.image}>
            </Image>
        </View>
        <View style = {style.titleContainer}>
            <Image 
            source = {data.artwork}
            style = {style.image2}></Image>
            <View style = {style.discription}>
                <Text style = {style.title}>
                    {data.title}
                </Text>
                <Text style = {isEnabled ? style.artist : style.artistLight}>
                    {data.artist}
                </Text>
            </View>
        </View>
        <View style = {style.playerContainer}>
            <View style = {style.heartContainer}>
            <TouchableOpacity onPress = {addFav}>
            <Ionicons name="heart-outline" size = {30} color = {isEnabled ? 'white' : '#080830'} style = {{marginRight: 30}} />
            </TouchableOpacity>
            <TouchableOpacity>
            <Ionicons name="md-download-outline" size = {30} color= {isEnabled ? 'white' : '#080830'} style = {{marginRight: 30}}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Entypo name="dots-three-vertical" size = {25} color= {isEnabled ? 'white' : '#080830'} style = {{marginTop: 6}}/>
            </TouchableOpacity>
            </View>
            <View style = {style.playerButton}>
                <TouchableOpacity>
                <FontAwesome name="random" size = {40} color = {isEnabled ? '#38c930' : '#141482'} style = {{marginTop: 30, marginRight: 30}}/>
                </TouchableOpacity>
                <PlayerButton iconType = {isPlaying? 'PAUSE' : 'PLAY'} iconColor = {isEnabled ? '#38c930' : '#141482'} onPress = {handle}></PlayerButton>
            </View>
        </View>
        <NativeBaseProvider>
        <Actionsheet hideDragIndicator  isOpen = {isOpen} onClose = {onClose}>
            <Actionsheet.Content borderTopRadius={0} backgroundColor = {isEnabled ? darkMode : lightMode}>
                <View style={{flexDirection: 'row', width: '100%'}}>
                    <Image
                    source={data.artwork}
                    style={style.buttonArtwork}
                    ></Image>
                    <View style = {style.handleContainer}>
                            <TouchableWithoutFeedback onPress = {handle} style = {{width: 50, height: 50}}>
                                <Ionicons name = {isPlaying? 'ios-pause' : 'play'} size = {50} color= "white"></Ionicons>
                            </TouchableWithoutFeedback>
                    </View>
                    <View style={style.timeContainer}>
                            <Text style = {[{marginLeft: 15, fontSize: 15, fontWeight: '700'}, isEnabled ? {color: 'white'} : {color : '#141482'}]}>
                                {convertTime(Math.ceil(currentPosition / 1000))}
                            </Text>
                            <Text style = {[{marginLeft: 380, fontSize: 15, fontWeight: '700'}, isEnabled ? {color: 'white'} : {color : '#141482'}]}>
                            {convertTime(Math.ceil(duration / 1000))}
                            </Text>
                        </View>
                        <Slider 
                        minimumValue={0}
                        maximumValue={1}
                        maximumTrackTintColor = {isEnabled ? 'gray' : 'red'}
                        minimumTrackTintColor= {isEnabled ? 'blue' : 'red'}
                        thumbTintColor= {isEnabled ? 'gray' : 'red'}
                        value = {currentPosition / duration}
                        onValueChange={async (value) => {
                        setCurrentPosition(value * duration);
                        }}
                        onSlidingStart={async () => {
                            if(!isPlaying) return;
                            try{
                                await handleAudio();
                            }
                            catch(error) {
                                console.log('Error inside onSlidingStart callback', error);
                              }
                        }}
                        onSlidingComplete={async () => {
                            if(isPlaying) return;
                            try{
                                await handleAudio();
                            }
                            catch(error) {
                                console.log('Error inside onSlidingComplete callback', error);
                              }
                        }}
                        style = {style.slider}>
                        </Slider>
                </View>
            </Actionsheet.Content>
        </Actionsheet>
        </NativeBaseProvider>
        </>
    )
}

const style = StyleSheet.create({
    heartContainer: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 33,
        marginLeft: 34,
        marginRight: 0,
    },
    playerContainer:{
        width: width,
        display: 'flex',
        flexDirection: 'row',
    },
    playerButton: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '42%',
    },
    discription: {
        marginLeft: 20,
        width: '50%',
    },
    artist: {
        textShadowOffset: {width: -1, height: 5},
        textShadowColor: '#2f5e9c',
        textShadowRadius: 20,
        color: '#a1c6f7',
        fontSize: 30,
        fontFamily: 'Pacifico_400Regular',
    },
    artistLight: {
        textShadowOffset: {width: 1, height: 0},
        textShadowColor: '#141d40',
        textShadowRadius: 20,
        color: '#12182e',
        fontSize: 30,
        fontFamily: 'Pacifico_400Regular',
    },
    title: {
        textShadowOffset: {width: -1, height: 5},
        textShadowColor: '#2f5e9c',
        textShadowRadius: 20,
        color: '#b1f2ee',
        fontSize: 50,
        fontFamily: 'DynaPuff_500Medium',
    },
    titleLight: {
        textShadowOffset: {width: -1, height: 5},
        textShadowColor: '#0f4a17',
        textShadowRadius: 20,
        color: '#0a3610',
        fontSize: 50,
        fontFamily: 'DynaPuff_500Medium',
    },
    timeContainer: {
        position: 'absolute', 
        flexDirection: 'row', 
        marginLeft: 100, 
        marginTop: 10
    },
    buttonArtwork: {
        height: 100, 
        width: 100, 
        position: "absolute",
    },
    handleContainer: {
        height: 100, 
        width: 100, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    titleContainer: {
        marginTop: 50, 
        width: width,
        display: 'flex',
        flexDirection: 'row',
    },
    imageContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 100,
    },
    image: {
        height: '100%',
    },
    image2: {
        marginLeft: 30,
        width: 200,
        height: 200,
    },
    slider:{
        width: '85%',
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
      },
})

export default Detail;