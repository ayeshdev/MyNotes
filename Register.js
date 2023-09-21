
import { useState } from "react";
import { Alert, Button, Image, Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { BlurView } from "expo-blur";



export function RegisterUi({ navigation }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userType, setUserType] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Student', value: '1' },
        { label: 'Employee', value: '2' },
        { label: 'Teacher', value: '3' },
        { label: 'Employer', value: '4' },
    ]);

    function register() {
        const registerDetails = {
            firstName: firstName,
            lastName: lastName,
            userType: userType,
            mobileNumber: mobileNumber,
            password: password
        }

        fetch("http://10.0.2.2:8080/react_note_app/registerProcess.php",
            {
                method: "POST",
                body: JSON.stringify(registerDetails)
            })
            .then(response => {
                return response.text();
            })
            .then(value => {
                if (value == "Register Successful!") {
                    Alert.alert("Success!", value);
                    navigation.navigate('Login');
                } else {
                    Alert.alert("Failed!", value);
                }
            })
            .catch(error => {
                Alert.alert("Error", error.message);
            })
    }

    const ui = (
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
                            <Text style={styles.heading}>Regsiter</Text>
                        </View>
                    </View>


                    <View style={styles.login_container}>
                        <View style={styles.input_fields_container}>

                            <TextInput placeholder="First Name" style={styles.input} onChangeText={setFirstName} value={firstName} />


                            <TextInput placeholder="Last Name" style={styles.input} onChangeText={setLastName} value={lastName} />



                            <View zIndex={1000} style={styles.usertype}>

                                <DropDownPicker

                                    placeholderStyle={{
                                        color: "grey",
                                    }}

                                    dropDownContainerStyle={{
                                        backgroundColor: "white",
                                        opacity: 1,
                                        zIndex: 7,
                                        borderRadius: 10,

                                    }}

                                    style={{ borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, backgroundColor: "#f1faee", }} placeholder="User Type" value={userType}
                                    open={open}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setUserType}
                                    setItems={setItems}
                                />
                            </View>

                            <TextInput placeholder="Mobile" style={styles.input} onChangeText={setMobileNumber} keyboardType="numeric" value={mobileNumber} />

                            <TextInput placeholder="Password" style={styles.input} onChangeText={setPassword} value={password} />



                        </View>


                        <View style={styles.button_container}>

                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed ? `#38a3a5` : "#57cc99",
                                        flex: 1,
                                        borderRadius: 10
                                    },
                                ]}
                                onPress={register}
                            >
                                <View style={styles.login_btn}>
                                    <Text style={styles.login_btn_txt}>Register</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>

                </BlurView>


            </View>

        </SafeAreaView>
    );

    return ui;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    blurContainer: {
        padding: 20,
        width: '90%',
        margin: 16,
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 20,
        zIndex: 5,
    },

    login_container: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#f1faee",
        justifyContent: "center",
    },
    cardContainer: {
        width: '100%',
        height: '100%',
    },
    input: {
        height: 50,
        padding: 10,
        borderRadius: 10,
        borderBottomWidth: 1,
    },
    heading: {
        fontSize: 35,
    },
    usertype: {
        borderColor: 'white',
        borderBottomWidth: 1,
        backgroundColor: "#f1faee",
    },
    button_container: {
        padding: 10,
        gap: 10,
        flexDirection: "row",
        alignItems: "flex-center",
        justifyContent: "flex-center",
    },
    input_fields_container: {
        padding: 10,
        gap: 10
    },
    heading: {
        fontSize: 35,
        color: "black",
        fontWeight: "bold",
    },
    heading_container: {
        flex: 1,
        alignItems: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    register_container: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f1faee',
        justifyContent: 'center'
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
});