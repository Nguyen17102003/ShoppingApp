import { StatusBar } from "expo-status-bar"; 
import React, { useState, createRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Checkbox from "expo-checkbox";
import * as data from '../data/data.json'
export default function Login(props) {
  const InputRef = createRef();
  const [isSelected, setSelection] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    if(!email)
    {
      alert('Please fill in email');
      return;
    }
    if(!password)
    {
      alert('Please fill in password');
      return;
    }
    
    try
    {
      for(let i = 0; i < data.user.length; i++)
      {
        if(email === data.user[i].Email && password === data.user[i].Password) 
        {
            currentUser = data.user[i].id;
            props.navigation.navigate('Tab');
        }
      }
    }
    catch(e)
    {
      console.log('error')
    }
  } 
  return(
    <>
    <View style={{
      flex: 1,
      alignItems: 'center',
    }}>
    <View style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }}>
    <Image 
    source={require('../image/city3.png')}
    resizeMode='cover'
    >
      </Image>
    </View>
    </View>
    <View style = {[styles.container]}>
        <Image style = {styles.image} source={require("../image/success.png")} />
        <StatusBar style = "auto" />
        <View style = {styles.inputView}>
          
          <TextInput
            style = {styles.TextInput}
            keyboardType = "phone-pad"
            returnKeyType = "next"
            placeholder = "e.g username@gmail.com"
            placeholderTextColor="#003f5c"
            onChangeText = {(email) => setEmail(email)}
            Login={() => InputRef.current && InputRef.current.focus()} />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style = {styles.TextInput}
            placeholder = "Password"
            placeholderTextColor = "#003f5c"
            secureTextEntry = {isSelected ? false : true}
            onChangeText  = {(password) => setPassword(password)}
            onSubmitEditing = {Keyboard.dismiss}
            blurOnSubmit = {false} />
        </View>
        <View style = {{ width: '100%'}}>
          <View style = {{ marginLeft: 100, flexDirection: 'row', marginBottom: 20 }}>
            <Checkbox
              style = {{ marginRight: 10, borderColor: 'white'}}
              value = {isSelected}
              onValueChange = {setSelection} />
            <Text style = {{
              color: 'white', 
              fontWeight: 'bold', 
              textShadowColor: 'black', 
              textShadowOffset: {width: 1, height: 1},
              textShadowRadius: 10}}> Show Password </Text>
          </View>
          <TouchableOpacity 
          onPress = {() => props.navigation.navigate('Register')}
          style = {{ marginLeft: 100}}>
            <Text style = {styles.forgot_button}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style = {styles.loginBtn}
          onPress = {login}>
          <Text style = {styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View></> 
  );
}
export var currentUser;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 50,
    marginBottom: 20,
    alignItems: "flex-start"
  },
  TextInput: {
    fontSize: 18,
    fontWeight: '500',
    height: 70,
    flex: 1,
    marginLeft: 20,
  },
  forgot_button: {
    height: 20,
    marginBottom: 0,
    color: 'white', fontWeight: 'bold', 
    textShadowColor: 'black', 
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "yellow",
  },
  loginText:{
    fontWeight: '800'
  }
})