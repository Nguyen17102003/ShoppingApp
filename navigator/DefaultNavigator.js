import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import Detail from "../screens/DetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Setting from "../screens/SettingScreen";
const stack = createNativeStackNavigator();
export default function DefaultNavigator () {
    return(
            <stack.Navigator screenOptions={{headerShown: false}} useLegacyImplementation>
            <stack.Screen name = 'Home' component = {HomeScreen}></stack.Screen>
            <stack.Screen name = 'Detail' component = {Detail}></stack.Screen>
            <stack.Screen name = 'Profile' component = {ProfileScreen}></stack.Screen>
            <stack.Screen name = 'Setting' component= {Setting}></stack.Screen>
            </stack.Navigator>
    )
}