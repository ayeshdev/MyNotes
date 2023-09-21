import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FloatingAction } from "react-native-floating-action";
import {
    Alert,
    Button,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export function HomeUi({ navigation }) {
    const [note, setNotes] = useState("");
    const [icon, setIcon] = useState("");

    //modal state
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [modalData, setModalData] = useState([]);

    //useEffect
    useEffect(() => {

        fetch("http://10.0.2.2:8080/react_note_app/loadNotes.php")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setNotes(json);
            })
            .catch((error) => {
                Alert.alert("Error", "No Data Found!");
            });

    })


    //Floting button data
    const actions = [
        {
            text: "Add Note",
            icon: require("./assets/images/addnote.png"),
            name: "add_note",
            position: 1,
        },
        {
            text: "Logout",
            icon: require("./assets/images/logout.png"),
            name: "logout",
            position: 2,
        },
    ];

    async function logOutUser() {
        await AsyncStorage.removeItem("mobile");
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading_container}>
                <Text style={styles.heading}>Home</Text>
            </View>

            <FlatList data={note} renderItem={NoteUi} />


            {/*Floating button*/}


            <FloatingAction
                color="red"
                buttonSize={70}
                size={70}
                actions={actions}
                distanceToEdge={10}
                onPressItem={(name) => {
                    if (name == "add_note") {
                        navigation.navigate("AddNotes");
                    } else if (name == "logout") {
                        logOutUser();
                    }
                }}
            />


            {/*Note details Modal Component*/}

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modal_title}>{modalData.title}</Text>

                            <Text style={styles.modal_desc}>{modalData.desc}</Text>
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed ? `#38a3a5` : "#57cc99",
                                        borderRadius: 10,
                                        padding: 10,
                                        marginTop: 10,
                                        marginLeft: 10,
                                    },
                                ]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {/*delete note Modal Component*/}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={deleteModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setDeleteModalVisible(!deleteModalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modal_title}>Are you sure?</Text>

                            {/*Modal Delete and Close button*/}

                            <View style={{ flexDirection: 'row' }}>
                                <Pressable
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed ? `#38a3a5` : "#57cc99",
                                            borderRadius: 10,
                                            padding: 10,
                                            marginTop: 10,
                                            marginLeft: 10,
                                        },
                                    ]}
                                    onPress={() => setDeleteModalVisible(!deleteModalVisible)}
                                >
                                    <Text style={styles.textStyle}>Close</Text>
                                </Pressable>

                                {/*Delete Note Button*/}
                                <Pressable
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed ? `#d90429` : "#ef233c",
                                            borderRadius: 10,
                                            padding: 10,
                                            marginTop: 10,
                                            marginLeft: 10,
                                        },
                                    ]}

                                    onPress={() => {

                                        const id = modalData.id;

                                        //Delete Note Function
                                        fetch(`http://10.0.2.2:8080/react_note_app/deleteNote.php/?id=${id}`)
                                            .then((response) => {
                                                return response.text();
                                            })
                                            .then((response_text) => {
                                                Alert.alert("Success!", response_text);
                                                setDeleteModalVisible(!deleteModalVisible);
                                            })
                                            .catch((error) => {
                                                Alert.alert("Error", error.message);
                                            });
                                    }}
                                >
                                    <Text style={styles.textStyle}>Delete</Text>
                                </Pressable>

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );



    function NoteUi({ item }) {

        let imgdata = "";

        function m() {
            if (item['name'] == 'Study') {
                imgdata = "https://cdn-icons-png.flaticon.com/128/1903/1903172.png"
            } else if (item['name'] == 'Travel') {
                imgdata = "https://cdn-icons-png.flaticon.com/128/201/201623.png"
            } else if (item['name'] == 'Personal') {
                imgdata = "https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
            } else if (item['name'] == 'Work') {
                imgdata = "https://cdn-icons-png.flaticon.com/128/5038/5038308.png"
            }
            return imgdata;
        }

        const ui = (
            <SafeAreaView style={styles.container}>
                <View style={styles.note_container}>
                    <View style={styles.date}>
                        <Text>{item.date}</Text>
                    </View>

                    <View style={styles.note_inside_container}>
                        <View style={styles.image_container}>
                            <Image
                                style={styles.image}
                                source={{ uri: m() }}
                            />
                        </View>

                        <View style={styles.title_desc_container}>
                            <Text numberOfLines={1}
                                ellipsizeMode="tail" style={styles.title}>{item.title}</Text>
                            <View style={{ width: 140 }}>
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={styles.desc}
                                >
                                    {item.desc}
                                </Text>
                            </View>
                        </View>



                        {/*Delete and View Buttons*/}

                        <View>
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed ? `#38a3a5` : "#57cc99",
                                        borderRadius: 10,
                                        padding: 10,
                                        marginTop: 10,
                                        marginLeft: 10,
                                    },
                                ]}
                                onPress={() => {
                                    setModalVisible(true);
                                    setModalData({ title: item.title, desc: item.desc });
                                }}
                            >
                                <Ionicons name="eye" color="white" size={25} />
                            </Pressable>
                        </View>



                        <View>
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed ? `#e63946` : "#d90429",
                                        borderRadius: 10,
                                        padding: 10,
                                        marginTop: 10,
                                        marginLeft: 10,
                                    },
                                ]}
                                onPress={() => {
                                    setDeleteModalVisible(true);
                                    setModalData({ id: item.note_id });
                                }}
                            >
                                <Ionicons name="trash" size={25} color="white" />
                            </Pressable>
                        </View>




                    </View>
                </View>
            </SafeAreaView>


        );
        return ui;
    }
}




const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    heading: {
        fontSize: 35,
    },

    note_container: {
        backgroundColor: "#f1faee",
        padding: 10,
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
        flex: 1,
    },
    note_inside_container: {
        flexDirection: "row",
    },
    date: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingLeft: 70,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        width: 140
    },
    desc: {},

    image: {
        width: 60,
        height: 60,
        objectFit: "contain",
        borderRadius: 50,
        borderColor: "black",
        borderWidth: 1,
    },
    image_container: {
        flexDirection: "column",
    },
    title_desc_container: {
        paddingLeft: 20,
        justifyContent: "center",
        flexDirection: "column",
    },
    heading_container: {
        padding: 10,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    add_note_btn: {
        backgroundColor: "#80ed99",
        borderRadius: 50,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modal_title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    modal_desc: {
        fontSize: 15,
        marginBottom: 15,
        textAlign: "center",
    },
});
