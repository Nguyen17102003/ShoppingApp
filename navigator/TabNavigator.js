import React, {useState, useEffect}  from "react";
import { Feather, Ionicons } from '@expo/vector-icons'; 
import { StyleSheet } from "react-native";
import FavouriteScreen from "../screens/FavouriteScreen";
import DefaultNavigator from "./DefaultNavigator";
import SearchScreen from "../screens/SearchScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { currentUser } from "../screens/LoginScreen";
import { SongContext } from "../misc/useSongs";
import { home, dntu } from "../misc/specific";
const Tab = createBottomTabNavigator();
export default function TabNavigator() {
  const [sound, setSound] = useState();
  const [currentID, setCurrentID] = useState(0);
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState();
  const [background, setBackground] = useState();
  const [isEnabled, setIsEnabled] = useState(true);
useEffect(() => {
  (async () => {
    await fetch(`${dntu}/${currentUser}`,
    {
      method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
      setFirstname(res.Firstname);
      setLastname(res.Lastname);
      setEmail(res.Email);
      setPassword(res.Password);
      setBackground(res.Background);
      setAvatar(res.Avatar);
      setIsEnabled(res.Darkmode);
    })
  })();
}, [])
    return(
      <SongContext.Provider value = {{
        sound, setSound, 
        currentID, setCurrentID, 
        firstname, setFirstname, 
        lastname, setLastname, 
        avatar, setAvatar,
        background, setBackground,
        email, setEmail,
        password, setPassword,
        isEnabled, setIsEnabled
        }}>
        <Tab.Navigator useLegacyImplementation
        screenOptions={{headerShown: false, tabBarStyle: {
            position: "absolute",
            left: 0,
            bottom: 10,
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarInactiveTintColor: isEnabled ? 'gray' : '#3b457d',
          tabBarActiveTintColor: isEnabled ? 'white' : '#0a0a38'}}>
            <Tab.Screen name = 'Default' component = {DefaultNavigator} options = {{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Feather name="home" color={color} size={size} />
                  ),
            }}></Tab.Screen>
            <Tab.Screen name = 'Search' component = {SearchScreen} options = {{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="search" color={color} size={size} />
                  ),
            }}></Tab.Screen>
            <Tab.Screen name = 'Library' component = {FavouriteScreen} options = {{
                tabBarLabel: 'Library',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="library-outline" color={color} size={size} />
                  ),
            }}></Tab.Screen>
        </Tab.Navigator>
        </SongContext.Provider>
    )
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})