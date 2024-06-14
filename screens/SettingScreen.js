import React, {useState, createRef, useContext, useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { 
    View, Text, 
    TextInput, StyleSheet, 
    TouchableOpacity, 
    Dimensions, Alert,
    Switch } from "react-native";
import { darkMode, lightMode} from "../misc/helper";
import { home, dntu } from "../misc/specific";
import { SongContext } from "../misc/useSongs";
import { Montserrat_600SemiBold, Montserrat_100Thin, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";
import { currentUser } from "./LoginScreen";

const {width} = Dimensions.get('window');
const Setting = ({navigation}) => {
    const {
        firstname,
        lastname,
        email,
        isEnabled,
    } = useContext(SongContext);
    const InputRef = createRef();
    const [Firstname, setF] = useState(firstname);
    const [Lastname, setL] = useState(lastname);
    const [Email, setE] = useState(email);
    const [passwordVerification, setPasswordVerfication] = useState("");
    const [isPasswordHided, setPasswordHidden] = useState(false);
    const [isVerficationHided, setVerficationHidden] = useState(false);
    const [icons, setIcons] = useState('md-eye');
    const [verifyicon, setVerifyIcon] = useState('md-eye');
    const [switchOn, setSwitch] = useState(isEnabled);
    const [fontLoaded] = useFonts({
        Montserrat_600SemiBold,
        Montserrat_100Thin,
        Montserrat_400Regular,
    })
    if(!fontLoaded) return null;
    const hiddenPassword = () => {
        if (icons === 'md-eye') {
            setIcons('md-eye-off');
            setPasswordHidden(!isPasswordHided);
          } else if (icons === 'md-eye-off') {
            setIcons('md-eye');
            setPasswordHidden(!isPasswordHided);
          } 
    };
    const toggleSwitch = () => setSwitch(current => !current)
    const hiddenVerifying = () => {
        if(verifyicon === 'md-eye'){
            setVerifyIcon('md-eye-off');
            setVerficationHidden(!isVerficationHided);
        } else if (verifyicon === 'md-eye-off'){
            setVerifyIcon('md-eye');
            setVerficationHidden(!isVerficationHided);
        }
    }
    const A = () => {
        Alert.alert('Your profile have been changed!', 'Please login again to save changes', [
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
    const B = () => {
        Alert.alert('Warning','Are you sure to submit your new profile?', [
            {
                text: 'Cancel',
            },
            {
                text: 'Yes',
                onPress: () => {handleSubmit(); A()},
            }
        ])
    }
    const handleSubmit = async () => {
        await fetch(`${dntu}/${currentUser}`,
        {
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                Firstname: Firstname,
                Lastname: Lastname,
                Email: Email,
                Darkmode: switchOn,
            })
        });
        
    }
    return(
    <>
    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%' }}>
            <LinearGradient colors={isEnabled ? darkMode : lightMode} style={{ width: '100%', height: '100%' }}></LinearGradient>
    </View>
     <View style = {style.container}>
            <View style = {style.RegisterContainer} elevation = {7}>
                <Text style = {isEnabled ? style.RegisterHere : style.RegisterHereLight}>SETTING</Text>
                <View style = {style.inputContainer}>
                <View style = {style.tagContainer}>
                <Text style = {isEnabled ? style.tag : style.tagLight}>Firstname: </Text>
                </View>
                <TextInput
                style = {isEnabled ? style.Input : style.InputLight}
                autoFocus={false}
                placeholder = {firstname}
                placeholderTextColor = {isEnabled ? "#03cafc" : '#070726'}
                onChangeText={(text) => setF(text)}
                ></TextInput>
                </View>

                <View style = {style.inputContainer}>
                <View style = {style.tagContainer}>
                <Text style = {isEnabled ? style.tag : style.tagLight}>Lastname: </Text>
                </View>
                <TextInput
                style = {isEnabled ? style.Input : style.InputLight}
                autoFocus = {true}
                placeholder = {lastname}
                placeholderTextColor = {isEnabled ? "#03cafc" : '#070726'}
                onChangeText={(text) => setL(text)}
                ></TextInput>
                </View>

                <View style = {style.inputContainer}>
                <View style = {style.tagContainer}>
                <Text style = {isEnabled ? style.tag : style.tagLight}>Your email: </Text>
                </View>
                <TextInput
                style = {isEnabled ? style.Input : style.InputLight}
                autoCapitalize="none"
                autoFocus = {true}
                placeholder = {email}
                placeholderTextColor = {isEnabled ? "#03cafc" : '#070726'}
                onChangeText={(text) => setE(text)}
                ></TextInput>
                </View>

                <View style = {style.inputContainer}>
                <View style = {style.tagContainer}>
                <Text style = {isEnabled ? style.tag : style.tagLight}>{isEnabled ? 'Dark': 'Light'} mode</Text>
                </View>
                <View style = {{marginLeft: 15}}>
                 <Switch
                style={{transform: [{ scaleX: 1.6 }, { scaleY: 1.5 }]}}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={switchOn ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={switchOn}
                />
                </View>
                </View>
                <TouchableOpacity onPress = {B}>
                <LinearGradient colors={isEnabled ? ['#a62644', '#c9385a', '#eb5779'] : darkMode} style = {style.linearGradient}>
                    <Text style = {style.buttonText}>
                    Submit
                    </Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    </>
    )
}
const style = StyleSheet.create({
    switch: {
        flexDirection: 'row',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 30,
        width: '90%',
        height: '7%',
    },
    tagContainer: {
        width: '35%',
        height: '100%', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    tag: {
        fontFamily: 'Montserrat_600SemiBold', 
        color: '#03cafc',
        fontSize: 20
    },
    tagLight: {
        fontFamily: 'Montserrat_600SemiBold', 
        color: '#070726',
        fontSize: 20
    },
    inputContainer: {
        width: '90%',
        height: '7%',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 30,
    },
    container:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    RegisterContainer:{
        shadowOffset: {width: 20, height: 20},
        shadowRadius: 20,
        shadowColor: '#46198a',
        alignItems: 'center',
        height: '60%',
        width: '70%',
        borderRadius: 10,
    },
    RegisterBackground:{
        marginTop: '30%',
        marginLeft: '13%',
        height: '60%',
        width: '70%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#d5bfde',
        borderRadius: 20,
        opacity: 0.3,
    },
    RegisterHere:{
        marginTop: 20,
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 30,
        color: '#a1c6f7',
        textShadowOffset: {width: -1, height: -1},
        textShadowColor: '#2f5e9c',
        textShadowRadius: 10,
    },
    RegisterHereLight:{
        marginTop: 20,
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 30,
        color: '#070726',
        textShadowOffset: {width: -1, height: -1},
        textShadowColor: '#2f5e9c',
        textShadowRadius: 10,
    },
    PasswordInput:{
        fontFamily: 'Montserrat_600SemiBold',
        width: '100%',
        color: '#03cafc',
        fontSize: 20,
        borderBottomColor: '#03cafc',
        borderBottomWidth: 2,
    },
    Input:{
        fontFamily: 'Montserrat_600SemiBold',
        color: '#03cafc',
        fontSize: 20,
        borderBottomColor: '#03cafc',
        borderBottomWidth: 0.5,
        height: '100%',
        width: '60%',
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    InputLight:{
        fontFamily: 'Montserrat_600SemiBold',
        color: '#070726',
        fontSize: 20,
        borderBottomColor: '#070726',
        borderBottomWidth: 0.5,
        height: '100%',
        width: '60%',
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Password:{
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 30,
        width: '90%',
        height: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    RegisterButton:{
        borderRadius: 10,
        height: 50,
        fontSize: 30,
    },
    linearGradient: {
        borderRadius: 10,
      },
    buttonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginHorizontal: 100,
        color: '#a1c6f7',
        textShadowOffset: {width: -1, height: -1},
        textShadowColor: '#2f5e9c',
        textShadowRadius: 10,
        backgroundColor: 'transparent',
      },
})
export default Setting;