import React from "react";
import { Ionicons } from "@expo/vector-icons";
const PlayerButton = (props) => {
    const {
        iconType, 
        size = 100, 
        iconColor,
        otherProps,
        onPress,
    } = props;
    const getIconName = (type) => {
        switch(type)
        {
            case 'PLAY':
                return 'play-circle';
            case 'PAUSE':
                return 'md-pause-circle';
            case 'PICTURE-PLAY':
                return 'play';
            case 'PICTURE-PAUSE':
                return 'ios-pause'
        }
    }
    return(
         <Ionicons
         {...props}
         onPress = {onPress}
         name = {getIconName(iconType)}
         size = {size}
         color = {iconColor}
         ></Ionicons>
    )
};
export default PlayerButton;