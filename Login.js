import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    Image,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function LoginUi({ navigation }) {


    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const [getData, setData] = useState("");

    viewData()

    useEffect(() => {
        console.warn('use Effect');

        if (getData == mobile) {
            console.warn('navigate to home');
            navigation.navigate('Home');
        } else {
            console.warn('navigate to home');
            navigation.navigate('Login');
        }

    }, [getData])



    //login function

    function login() {

        const loginDetails = {
            mobile: mobile,
            password: password,
        };

        fetch("http://10.0.2.2:8080/react_note_app/loginProcess.php", {
            method: "POST",
            body: JSON.stringify(loginDetails),
        })
            .then((response) => {
                return response.text();
            })
            .then(async (response_text) => {
                if (response_text == "Login Success!") {

                    Alert.alert("Success!", response_text);

                    await AsyncStorage.setItem("mobile", mobile);
                    await AsyncStorage.getItem("mobile");

                    navigation.navigate('Home');

                } else {
                    Alert.alert("Failed", response_text);
                }
            })
            .catch((error) => {
                Alert.alert("Error", error.message);
            });
    }

    //go to register
    function register() {
        navigation.navigate("Register");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.backgroundImage}
                source={require("./assets/images/splash_bg_gradient.jpg")}
            />

            <View style={styles.contentContainer}>
                <BlurView intensity={100} style={styles.blurContainer}>

                    <View style={{ flexDirection: 'row' }}>

                        <Image style={{ width: 100, height: 100 }} resizeMode="contain" source={require("./assets/images/logo/color_no_bg.png")} />

                        <View style={styles.heading_container}>
                            <Text style={styles.heading}>Login</Text>
                        </View>
                    </View>


                    <View style={styles.login_container}>
                        <View style={styles.input_fields_container}>

                            <TextInput
                                style={styles.input}
                                onChangeText={setMobile}
                                keyboardType="numeric"
                                value={mobile}
                                placeholder="Mobile"
                            />


                            <TextInput
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Password"
                            />
                        </View>

                        <View style={styles.button_container}>
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed ? `#38a3a5` : "#57cc99",
                                        flex: 1,
                                        borderRadius: 10,
                                    },
                                ]}
                                onPress={register}
                            >
                                <View style={styles.login_btn}>
                                    <Text style={styles.login_btn_txt}>Register</Text>
                                </View>
                            </Pressable>
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed ? `#38a3a5` : "#57cc99",
                                        flex: 1,
                                        borderRadius: 10,
                                    },
                                ]}
                                onPress={login}
                            >
                                <View style={styles.login_btn}>
                                    <Text style={styles.login_btn_txt}>Login</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </BlurView>
            </View>
        </SafeAreaView>
    );


    async function viewData() {
        const y = await AsyncStorage.getItem("mobile");
        setData(y);
    }

    async function saveData() {

        await AsyncStorage.setItem("mobile", mobile);

        await AsyncStorage.getItem("mobile");
        viewData()
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    blurContainer: {
        padding: 20,
        width: '90%',
        margin: 16,
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 20,
        zIndex: 5,
    },
    backgroundImage: {
        height: "100%",
        width: '100%',
        zIndex: 1,
    },
    contentContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    cardContainer: {
        width: '100%',
        height: '100%',
    },

    //after blur

    heading: {
        fontSize: 35,
        color: "black",
        fontWeight: "bold",
    },
    login_container: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#f1faee",
        justifyContent: "center",
    },
    input_fields_container: {
        padding: 10,
    },
    input: {
        height: 50,
        borderWidth: 0,
        borderBottomWidth: 1,
        padding: 9,
        marginTop: 8,
        borderRadius: 5,
    },
    button_container: {
        padding: 10,
        gap: 10,
        flexDirection: "row",
        alignItems: "flex-center",
        justifyContent: "flex-center",
    },
    button: {
        borderRadius: 10,
    },
    login_btn: {
        padding: 15,
    },
    login_btn_txt: {
        color: "white",
        textAlign: "center",
        fontSize: 17,
    },
    pressable: {
        flex: 1,
    },
    heading_container: {
        flex: 1,
        alignItems: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
});
