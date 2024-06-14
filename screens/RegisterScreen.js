import React, {useState, createRef} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight, Keyboard, TouchableOpacity, Alert } from "react-native";
import { Ionicons} from "@expo/vector-icons";
import { home, dntu } from "../misc/specific";
export default function Register({navigation}){
    const InputRef = createRef();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerification, setPasswordVerfication] = useState("");
    const [isPasswordHided, setPasswordHidden] = useState(false);
    const [isVerficationHided, setVerficationHidden] = useState(false);
    const [icons, setIcons] = useState('md-eye');
    const [verifyicon, setVerifyIcon] = useState('md-eye');
    const hiddenPassword = () => {
        if (icons === 'md-eye') {
            setIcons('md-eye-off');
            setPasswordHidden(!isPasswordHided);
          } else if (icons === 'md-eye-off') {
            setIcons('md-eye');
            setPasswordHidden(!isPasswordHided);
          } 
    };
    const hiddenVerifying = () => {
        if(verifyicon === 'md-eye'){
            setVerifyIcon('md-eye-off');
            setVerficationHidden(!isVerficationHided);
        } else if (verifyicon === 'md-eye-off'){
            setVerifyIcon('md-eye');
            setVerficationHidden(!isVerficationHided);
        }
    }
    let register = async () => {
        await fetch(`${dntu}`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Email: email, 
                Password: password, 
                Firstname: firstname, 
                Lastname: lastname,
                Avatar: null,
                Background: null,
                Darkmode: true}),
        });
    }
    return(
        <>
        <View style = {style.BackgroundImage}>
            <Image
                source = {require('../image/photo-1519501025264-65ba15a82390.png')}
                resizeMode= "cover"></Image>
        </View>
        <View style = {style.container}>
            <View style = {style.RegisterContainer} elevation = {7}>
                <Text style = {style.RegisterHere}>Register here</Text>
                <TextInput
                style = {style.Input}
                placeholder = "First name"
                placeholderTextColor = "#03cafc"
                onChangeText = {(firstname) => setFirstname(firstname)}
                Login = {() => InputRef.current && InputRef.current.focus()} 
                ></TextInput>
                <TextInput
                style = {style.Input}
                placeholder = "Last name"
                placeholderTextColor = "#03cafc"
                onChangeText = {(lastname) => setLastname(lastname)}
                ></TextInput>
                <TextInput
                style = {style.Input}
                placeholder = "Email"
                placeholderTextColor = "#03cafc"
                onChangeText = {(email) => setEmail(email)}
                ></TextInput>
                <View style = {style.Password}>
                    <TextInput
                        style = {style.PasswordInput}
                        placeholder = "Password"
                        placeholderTextColor = "#03cafc"
                        onChangeText = {(password) => setPassword(password)}
                        blurOnSubmit = {false}
                        secureTextEntry = {isPasswordHided ? false : true}
                        onSubmitEditing = {Keyboard.dismiss}
                        ></TextInput>
                        <TouchableHighlight onPress = {hiddenPassword}>
                        <Ionicons name= {icons} size={26} color="black"></Ionicons>
                        </TouchableHighlight>
                </View>

                <View style = {style.Password}>
                    <TextInput
                        style = {style.PasswordInput}
                        placeholder = "Password verfication"
                        placeholderTextColor = "#03cafc"
                        onChangeText = {(passwordVerification) => setPasswordVerfication(passwordVerification)}
                        blurOnSubmit = {false}
                        secureTextEntry = {isVerficationHided ? false : true}
                        onSubmitEditing = {Keyboard.dismiss}></TextInput>
                    <TouchableHighlight onPress = {hiddenVerifying}>
                        <Ionicons name= {verifyicon} size={26} color="black"></Ionicons>
                    </TouchableHighlight>
                   
                </View>
                <TouchableOpacity
                onPress = {register}>
                <LinearGradient colors={['#c7fcc8', '#7ef780', '#43fa46']} style = {style.linearGradient}>
                    <Text style = {style.buttonText}>
                    Sign up!
                    </Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </View></>
    )
}

const style = StyleSheet.create({
    BackgroundImage:{
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
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
        fontFamily: 'Roboto',
        fontWeight: '800',
        fontSize: 30,
        color: '#16ff05',
        textShadowColor: '#417d3d',
        textShadowOffset: {width: -1, height: -1},
        textShadowRadius: 5,
    },
    PasswordInput:{
        width: '100%',
        color: '#03cafc',
        fontSize: 20,
        borderBottomColor: '#03cafc',
        borderBottomWidth: 2,
    },
    Input:{
        color: '#03cafc',
        fontSize: 20,
        borderBottomColor: '#03cafc',
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 30,
        width: '90%',
        height: '7%',
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
        textShadowColor: '#eddddf',
        fontFamily: 'Roboto',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginHorizontal: 100,
        color: '#b56b77',
        backgroundColor: 'transparent',
      },
})
