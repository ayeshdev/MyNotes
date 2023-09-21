import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";
import { BlurView } from "expo-blur";

const Stack = createNativeStackNavigator();

export function AddNotesUi({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteType, setNoteType] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([

    { label: "Study", value: "1" },
    { label: "Travel", value: "2" },
    { label: "Personal", value: "3" },
    { label: "Work", value: "4" },
    
  ]);

  function addNote() {
    const noteDetails = {
      title: title,
      description: description,
      noteType: noteType,
    };

    fetch("http://10.0.2.2:8080/react_note_app/createNote.php", {
      method: "POST",
      body: JSON.stringify(noteDetails),
    })
      .then((response) => {
        return response.text();
      })
      .then((response_text) => {
        if (response_text == "Note Added!") {
          Alert.alert("Success!", response_text);
          navigation.navigate("Home");
        } else {
          Alert.alert("Failed", response_text);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
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
              <Text style={styles.heading}>Add Note</Text>
            </View>

          </View>


          <View style={styles.login_container}>
            <View style={styles.input_fields_container}>

              <TextInput placeholder="Title"
                style={styles.input}
                onChangeText={setTitle}
                value={title}
              />

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

                  style={{ borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, backgroundColor: "#f1faee", }} placeholder="Note Type"

                  value={noteType}
                  open={open}
                  items={items}
                  setOpen={setOpen}
                  setValue={setNoteType}
                  setItems={setItems}
                />
              </View>

              <TextInput placeholder="Description"
                style={styles.description}
                editable
                multiline
                numberOfLines={6}
                maxLength={300}
                onChangeText={setDescription}
                value={description}
              />

            </View>

            <View style={styles.button_container}>
              <Pressable onPress={addNote}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? `#38a3a5` : "#57cc99",
                    flex: 1,
                    borderRadius: 10,
                  },
                ]}
              >
                <View style={styles.login_btn}>
                  <Text style={styles.login_btn_txt}>Add Note</Text>
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
  contentContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
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
  login_container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f1faee",
    justifyContent: "center",
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
  register_container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f1faee",
    justifyContent: "center",
  },
  login_btn: {
    padding: 15,
  },
  login_btn_txt: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },
  usertype: {
    borderColor: 'white',
    borderBottomWidth: 1,
    backgroundColor: "#f1faee",
  },
  description: {
    height: 100,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
  }
});
