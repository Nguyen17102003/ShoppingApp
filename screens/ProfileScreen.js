import React, {useState, useEffect, useContext} from "react";
import { darkMode, lightMode } from "../misc/helper";
import * as ImagePicker from 'expo-image-picker';
import { Image, View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert} from "react-native";
import { currentUser } from "./LoginScreen";
import { Montserrat_600SemiBold, Montserrat_100Thin, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";
import { Audiowide_400Regular } from "@expo-google-fonts/audiowide";
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from "expo-linear-gradient";
import { home, dntu } from "../misc/specific";
import { SongContext } from "../misc/useSongs";
import dayjs from "dayjs";
const {width} = Dimensions.get('window');
const ProfileScreen = ({navigation}) => {
    const [galleryPermisson, setGalleryPermission] = useState();
    const {
        firstname,
        lastname,
        avatar,
        background,
        isEnabled} = useContext(SongContext);
    const [currentDate, setCurrentDate] = useState(dayjs());
    useEffect(() => {
      (async() => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setGalleryPermission(galleryStatus === 'granted');
      })();
      setInterval(() => {
        setCurrentDate(dayjs());
     }, 1000);
    }, []);
    const [fontLoaded] = useFonts({
        Montserrat_600SemiBold,
        Montserrat_100Thin,
        Montserrat_400Regular,
        Audiowide_400Regular
    })
    if(!fontLoaded) return null;
    const A = () => {
        Alert.alert('Your avatar have been changed!', 'Please login again to save changes', [
        {
            text: 'Cancel',
            onPress: () => alert(),
        },
        {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
        }
    ])
    }
    const pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });
        (async () => {
            await fetch(`${dntu}/${currentUser}`,
            {
                method: 'PATCH',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({Avatar: result.assets[0].uri})
            })
        })();
        A();
    };

    const pickBackground = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });
        (async () => {
            await fetch(`${dntu}/${currentUser}`,
            {
                method: 'PATCH',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({Background: result.assets[0].uri})
            })
        })();
        console.log(background);
    };

    return (
        <>
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%' }}>
            <LinearGradient colors={isEnabled ? darkMode : lightMode} style={{ width: '100%', height: '100%' }}></LinearGradient>
        </View>
        <View style={style.imageContainer}>
            <Image
                source={require('../image/city.png')}
                resizeMode='cover'
                style={style.image}
                >
            </Image>
        </View>
        <View style = {style.avatarContainer}>
                <Image
                    source={(avatar === null || avatar === undefined) ? require('../image/421-4212341_default-avatar-svg-hd-png-download.png') : {uri: avatar}}
                    style = {isEnabled ? style.image2 : style.image2Light}></Image>
        </View>
        <View style = {style.usernameContainer}>
            <Text style = {isEnabled ? style.username : style.usernameLight}>
                {firstname} {lastname}
            </Text>
        </View>
        <View style = {{height: 50, top: 230, left: 200}}>
            <Text style = {isEnabled ? style.datetime : style.datetimeLight}>
                {currentDate.format("DD/MM/YYYY")}
            </Text>
        </View>
        <View style = {{position: 'absolute', top: 100, right: 5}}>
            <Text style = {style.hour}>
                {currentDate.format("hh:mma")}
            </Text>
        </View>
        <TouchableOpacity style={isEnabled ? style.photoAddContainer : style.photoAddContainerLight} onPress = {() => pickAvatar()}>
        <MaterialIcons name="add-a-photo" size = {25} color= {isEnabled ? 'white' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={isEnabled ? style.penContainer : style.penContainerLight} onPress = {() => navigation.navigate('Setting')}>
        <FontAwesome5 name="pencil-alt" size = {23} color = {isEnabled ? 'white' : 'black'} />
        </TouchableOpacity>
        <View style={style.informationContainer}>
        <View style={style.informationRow}>
        <MaterialIcons name="place" size = {24} color = {isEnabled ? '#a1c6f7' : '#070726'}/>
        <Text style = {isEnabled ? style.informationText : style.informationTextLight}> Some address</Text>
        </View>
        <View style={style.informationRow}>
        <MaterialIcons name="email" size = {24} color = {isEnabled ? '#a1c6f7' : '#070726'}/>
        <Text style = {isEnabled ? style.informationText : style.informationTextLight}> Some email</Text>
        </View>
        <View style={style.informationRow}>
        <Ionicons name="phone-portrait-sharp" size = {24} color={isEnabled ? '#a1c6f7' : '#070726'} />
        <Text style = {isEnabled ? style.informationText : style.informationTextLight}> Some phone number</Text>
        </View>
        </View>
        <View style = {isEnabled ? style.optionButtonContainer : style.optionButtonContainerLight}>
        <TouchableOpacity style = {isEnabled ? style.optionButton : style.optionButtonLight}>
            <Ionicons name="heart-outline" size = {30} color = {isEnabled ? '#a1c6f7' : '#070726'} style = {{marginLeft: 30, marginRight: 10}} />
            <Text style = {isEnabled ? style.optionButtonText : style.optionButtonTextLight}>
                Your favourite
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {isEnabled ? style.optionButton : style.optionButtonLight}>
            <MaterialIcons name="payment" size = {30} color = {isEnabled ? '#a1c6f7' : '#070726'}  style = {{marginLeft: 30, marginRight: 10}} />
            <Text style = {isEnabled ? style.optionButtonText : style.optionButtonTextLight}>
                Your payment
            </Text>       
        </TouchableOpacity>
        <TouchableOpacity style = {isEnabled ? style.optionButton : style.optionButtonLight}>
        <MaterialIcons name="contact-support" size = {30} color = {isEnabled ? '#a1c6f7' : '#070726'}  style = {{marginLeft: 30, marginRight: 10}} />
            <Text style = {isEnabled ? style.optionButtonText : style.optionButtonTextLight}>
                Help
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {isEnabled ? style.optionButton : style.optionButtonLight}>
        <MaterialIcons name="reply" size = {30} color= {isEnabled ? '#a1c6f7' : '#070726'}  style = {{marginLeft: 30, marginRight: 10}} />
            <Text style = {isEnabled ? style.optionButtonText : style.optionButtonTextLight}>
                Tell your friends
            </Text>
        </TouchableOpacity>
        </View>
            </>
    )
}

const style = StyleSheet.create({
    imageContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 200,
    },
    image: {
        height: '100%',
    },
    image2: {
        marginTop: 40,
        marginLeft: 20,
        borderColor: 'white',
        borderWidth: 5,
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    image2Light: {
        marginTop: 40,
        marginLeft: 20,
        borderColor: 'black',
        borderWidth: 5,
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    avatarContainer: {
        position: 'absolute',
        marginTop: 80, 
        width: width,
        display: 'flex',
    },
    usernameContainer: {
        position: 'absolute',
        top: 270,
        width: width,
        height: 50,
    },
    username:{
        marginLeft: 10,
        fontSize: 40,
        fontFamily: 'Montserrat_600SemiBold',
        color: 'white',
        textShadowOffset: {width: -1, height: 5},
        textShadowColor: '#2f5e9c',
        textShadowRadius: 10,
    },
    usernameLight: {
        marginLeft: 10,
        fontSize: 40,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#070726',
        textShadowOffset: {width: -1, height: -1},
        textShadowColor: '#2f5e9c',
    },
    photoAddContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 140,
        left: 10,
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 2,
    },
    photoAddContainerLight: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 140,
        left: 10,
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#488c9c',
        borderColor: '#14272b',
        borderWidth: 2,
    },
    backgroundPhotoAddContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 50,
        right: 10,
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 2,
    },
    backgroundPhotoAddContainerLight: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 50,
        right: 10,
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#488c9c',
        borderColor: '#14272b',
        borderWidth: 2,
    },
    penContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 225,
        left: 135,
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 2,
    },
    penContainerLight: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 225,
        left: 135,
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#488c9c',
        borderColor: '#14272b',
        borderWidth: 2,
    },
    informationContainer:{
        width: width,
        position: 'absolute',
        top: 340,
        left: 40,
        height: 110,
        flexDirection: 'column',
    },
    informationRow: {
        height: 25,
        flexDirection: 'row',
        marginVertical: 5,
    },
    informationText: {
        fontSize: 19,
        marginLeft: 10,
        fontFamily: 'Montserrat_400Regular',
        color: '#a1c6f7',
        textShadowOffset: {width: -1, height: -1},
        textShadowColor: '#2f5e9c',
        textShadowRadius: 10,
    },
    informationTextLight: {
        fontSize: 19,
        marginLeft: 10,
        fontFamily: 'Montserrat_400Regular',
        color: '#070726',
        textShadowOffset: {width: -1, height: 0},
        textShadowColor: '#2f5e9c',
        textShadowRadius: 5,
    },

    datetime:{
        fontSize: 30, 
        fontFamily: 'Montserrat_600SemiBold', 
        color: 'white', 
        textShadowOffset: {width: -1, height: -1}, 
        textShadowColor: '#2f5e9c', 
        textShadowRadius: 10,
    },
    datetimeLight:{
        fontSize: 30, 
        fontFamily: 'Montserrat_600SemiBold', 
        color: '#0b144f', 
        textShadowRadius: 10,
    },
    hour: {
        fontSize: 80, 
        fontFamily: 'Audiowide_400Regular',
        color: 'white', 
        textShadowOffset: {width: -1, height: 2}, 
        textShadowColor: '#bfbff2', 
        textShadowRadius: 10,
    },
    hourLight: {
        fontSize: 80, 
        fontFamily: 'Audiowide_400Regular',
        color: '#39427d', 
        textShadowOffset: {width: -1, height: 2}, 
        textShadowColor: '#59629c', 
        textShadowRadius: 10,
    },
    optionButtonContainer: {
        top: 450, 
        borderBottomColor: '#a1c6f7', 
        borderBottomWidth: 0.5, 
        paddingBottom: 10,
    },
    optionButtonContainerLight: {
        top: 450, 
        borderBottomColor: '#070726', 
        borderBottomWidth: 0.5, 
        paddingBottom: 10,
    },
    optionButton: {
        paddingTop: 10,
        borderTopColor: '#a1c6f7', 
        borderTopWidth: 0.5,
        flexDirection: 'row', 
        height: 50, 
        width: width, 
        alignSelf: 'center',
        marginVertical: 10,
        alignItems: 'center',
    },
    optionButtonLight: {
        paddingTop: 10,
        borderTopColor: '#070726', 
        borderTopWidth: 0.5,
        flexDirection: 'row', 
        height: 50, 
        width: width, 
        alignSelf: 'center',
        marginVertical: 10,
        alignItems: 'center',
    },
    optionButtonText: {
        fontFamily: 'Montserrat_600SemiBold',
        color: '#a1c6f7',
        textShadowOffset: {width: -1, height: -1},
        textShadowColor: '#2f5e9c',
        fontSize: 20,
    },
    optionButtonTextLight: {
        fontFamily: 'Montserrat_600SemiBold',
        color: '#070726',
        textShadowOffset: {width: -1, height: -1},
        textShadowColor: '#2f5e9c',
        fontSize: 20,
    }
})

export default ProfileScreen;