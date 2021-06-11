import React, {useState} from 'react'
import { SafeAreaView, View, StyleSheet, Text, Button,  StatusBar, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { red, white, } from "../utils/colors"
import { addCardToDeck } from "../utils/_API_";
import { connect } from 'react-redux';
import { addCard } from "../actions/index";
// import {
//     clearLocalNotification,
//     setLocalNotification
//   } from "../utils/helpers";

function AddQuestion(props) {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("")
    const { dispatch, navigation, deckId } = props;
    const handleQuestion = (res) => {
        setQuestion(res)
    }
    const handleAnswer= (data) => {
        setResponse(data)
    }

    const handleSubmit = () => {
        if (question && response) {
            const card ={question: question, answer:response} 
            addCardToDeck(deckId, card)
            props.addCard(deckId, card)
        }
        setQuestion(" ")
        setResponse("")
        // clearLocalNotification().then(setLocalNotification)
    }
console.log(question, response, deckId)
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView  style={styles.question} behavior="padding">
                <TextInput  value={question}  placeholder="Question" style={styles.input}
                   onChangeText={  handleQuestion }          
                />
                <TextInput value={response}  placeholder="Answer" style={styles.input}
                   onChangeText={ handleAnswer}            
                    />
                   </KeyboardAvoidingView>
                    <TouchableOpacity style={styles.cardBtn} onPress={()=>handleSubmit()}>
                        <Text style={{ color: white, fontSize: 25, textAlign:"center" }} > Submit </Text>
                        </TouchableOpacity>
                        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    question: {
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        fontSize: 35,
        margin: "auto",
        padding: 20
    },
    textBtn: {
        fontSize: 25,
        color:white
    },

    cardBtn: {
        backgroundColor: red,
        borderRadius: 10,
        borderWidth: 0,
        alignSelf: "center",
        justifyContent:"center",
        width: "50%",
        fontSize: 30,
        padding: 20
    },

    input: {
        borderRadius: 10,
        borderWidth: 1,
        width: "80%",
        margin: 30,
        fontSize: 30,
        padding: 20
    },
    btnWrapper: {
        justifyContent: "center",
        alignItems:"center"
    }
})


function mapStateToProps(state, {route}) {
    const { deckId } = route.params;
    console.log(deckId)
    return ({
            deckId,
        }
    )
}


function mapDispatchToProps(dispatch, {route, navigation}) {
    const {deckId} = route.params;
    return {
        addCard: (id, card)=>dispatch(addCard(id, card)),
        goBack: () => navigation.goBack()
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);