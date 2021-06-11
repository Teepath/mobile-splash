import React, {useState} from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity , TextInput, KeyboardAvoidingView, Button} from 'react-native';
import { white } from "../utils/colors"
import { saveDeckTitle} from "../utils/_API_";
import { connect } from "react-redux";
import {addDeck} from "../actions/index"


function NewDeck(props) {
    const { navigation, addDeck } = props;
    const [input, setInput] = useState("")
    
    const handleChange = (res) => {
        console.log(res)
        setInput(res)
       
    }


    const handleSubmit = () => {
        if (input !== "") {
            // saveDeckTitle(input)
            addDeck(input)
        }
        console.log("I will be here")
        navigation.navigate('Decks', { deckId: input });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.text}> What is  the title of your new deck?</Text>
            </View>
            
                <KeyboardAvoidingView  style={{ width: "100%", alignItems: "center" }} behavior="padding">
                <TextInput   value={input}  placeholder="Deck Title" style={styles.input}
                   onChangeText={ handleChange}
                    />
                   </KeyboardAvoidingView>
                      <TouchableOpacity style={styles.cardBtn} >
                   <Button title="Submit" style={{color:white, fontSize:32}} onPress={()=> handleSubmit()}/> 
                    </TouchableOpacity>
                   
                  
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    text: {
        fontSize: 35,
        margin: "auto",
        padding: 20
    },

    cardBtn: {
        backgroundColor: "black",
        borderRadius: 10,
        borderWidth: 0,
        alignItems:"center",
        width: "80%",
        fontSize: 30,
        margin: 20,
        padding: 20
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        width: "80%",
        marginLeft: 10,
        marginRight: 10,
        fontSize: 30,
        padding: 20
    },


})

const mapStateToProps=()=>({})

function mapDispatchToProps(dispatch, {route, navigation}) {
    // const {deckId} = route.params;
    return {
        addDeck: (id)=>dispatch(addDeck(id)),
        // goBack: () => navigation.goBack()
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
