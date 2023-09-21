import { useEffect } from "react";
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";


export function SplashUI({ navigation }) {

    
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 2000)
    },[])
    
    const ui = (
        <View style={styles.container}>
            <ImageBackground blurRadius={10} source={require('./assets/images/splash_bg_dark.jpg')} resizeMode="cover" style={styles.image}>
                <View style={{ padding: 30, justifyContent: 'center', alignItems: 'center', opacity: 1 }} >
                    <Image style={{ width: 200, height: 200 }} source={require('./assets/images/logo/white_no_bg.png')} resizeMode='contain' />
                </View>
            </ImageBackground>
        </View>
    )
    return ui;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'

    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
});