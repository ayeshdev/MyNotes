import { Text, StyleSheet, View, SafeAreaView, Image, TextInput, Button, Alert, } from 'react-native';
import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function TestUi() {

    const [getText,setText] = useState("");
    const [getData, setData] = useState("");
    viewData()
    return (

        <SafeAreaView style={styles.container}>

            <Text style={{ fontSize: 20 }}>{getData}</Text>
            <Text>Login</Text>

            <TextInput style={{ borderWidth: 1, width: '80%' }} onChangeText={setText} />
            <Button title='save data' onPress={saveData} />


        </SafeAreaView>
    )

    async function viewData(){
        const y = await AsyncStorage.getItem("name");
        setData(y);
    }

    async function saveData(){
        await AsyncStorage.setItem("name",getText);

        const x = await AsyncStorage.getItem("name");
        viewData()

    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },

});
