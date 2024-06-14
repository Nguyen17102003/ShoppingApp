import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { currentUser } from "./LoginScreen";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";
const SimpleMenu = (props) => {
    const {
        optionName1,
        optionName2,
        option1,
        option2,
        iconType, 
    } = props
    return (
        <MenuProvider>
        <Menu>
            <MenuTrigger>
            <Ionicons name= {iconType} style = {{marginHorizontal: 10}} size={30} color="white"></Ionicons>
            </MenuTrigger>
            <MenuOptions>
                <MenuOption onSelect={option1} text = {optionName1}></MenuOption>
                <MenuOption onSelect={option2} text = {optionName2}></MenuOption>
            </MenuOptions>
        </Menu>
    </MenuProvider>
    )
}
export default SimpleMenu;