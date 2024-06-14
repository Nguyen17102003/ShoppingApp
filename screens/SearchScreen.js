import React, {useState, useEffect, useContext} from "react";
import { darkMode, lightMode } from "../misc/helper";
import img from "../data/search";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList} from "react-native";
import { Lobster_400Regular } from "@expo-google-fonts/lobster";
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useFonts } from "@expo-google-fonts/lobster/useFonts";
import { LinearGradient } from "expo-linear-gradient";
import SearchCard from "../items/SearchCard";
import filter from "lodash.filter";
import { SongContext } from "../misc/useSongs";
const {width} = Dimensions.get('window');

export default function SearchScreen({navigation}){
    const [fullData, setFullData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState()
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const {isEnabled} = useContext(SongContext);
    useEffect(() => {
        setLoading(true);
        try{
        setData(img);
        setLoading(true);
        setFullData(img);
        }catch{e => {
            setLoading(false);
            setError(e);
        }}
    }, []);
    const handleSearch = text => {
        setQuery(text);
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullData, option => {
            return contains(option, formattedQuery);
        })
        setData(filteredData);
    };
    const contains = ({title}, query) => {
        const filteredTitle = title.toLowerCase();
        if(filteredTitle.includes(query)) 
        {
            return true;
        };
        return false;
    }
    let [fontLoaded] = useFonts({
        Lobster_400Regular,
        Montserrat_700Bold,
    });
    if (!fontLoaded) {
        return null;
    } 
    function renderHeader(){
        return(
            <View>
                 <TextInput
                        autoFocus={true}
                        blurOnSubmit={false}
                        placeholder = "What do you want to search?"
                        autoCapitalize="none"
                        placeholderTextColor = {isEnabled? 'black' : 'white'}
                        value={query}
                        onChangeText = {queryText => handleSearch(queryText)}
                        style={isEnabled ? style.searchBar : style.searchBarLight}>
                        </TextInput>
                        <View style = {{width: '98%', alignSelf: 'center'}}></View>
            </View>
        )
    }
    return(
        <><View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%' }}>
            <LinearGradient colors={isEnabled ? darkMode : lightMode} style={{ width: '100%', height: '100%' }}></LinearGradient>
        </View>
        <View style={style.background}>
                <View style={style.greetContainer}>
                    <Text style={isEnabled ? style.greeting : style.greetingLight}> Search </Text>
                </View>
            <FlatList
            ListHeaderComponent={renderHeader}
            key = {item => item.id}
            keyExtractor={item => item.id}
            data = {data}
            renderItem = {({item}) => 
            <SearchCard data = {item}></SearchCard>}
            numColumns={2}
            >
            </FlatList>
            </View>
            </>
    )
}

const style = StyleSheet.create({
    searchBar: {
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '98%',
        marginTop: 20,
        paddingLeft: 20,
        fontSize: 20,
        fontWeight: '700',
        borderColor: 'red',
        borderRadius: 10,
        height: 50,
        marginBottom: 20,
    },
    searchBarLight: {
        backgroundColor: '#395c59',
        alignSelf: 'center',
        width: '98%',
        marginTop: 20,
        paddingLeft: 20,
        fontSize: 20,
        fontWeight: '700',
        borderColor: 'red',
        borderRadius: 10,
        height: 50,
        marginBottom: 20,
    },
    background:{
        flex: 1,
        display: 'flex',
    },
    notify: {
        marginLeft: '40%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        display: 'flex',
    },
    greetContainer: {
        marginTop: 10,
        width: width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    greeting:{
        marginLeft: '5%',
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
        fontSize: 30,
    },
    greetingLight:{
        marginLeft: '5%',
        fontFamily: 'Montserrat_700Bold',
        color: 'black',
        fontSize: 30,
    }
})
