import React,{useState} from 'react'
import { SafeAreaView, View, StyleSheet, Text, Button, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { white } from "../utils/colors";
import {  removeDeck } from '../utils/_API_';


function AddCard(props) {
    const[item, setDataItem] = useState({})
  const { deck, deckId, navigation, goBack} = props
   
    // const handleDelete = () => {
    //     removeDeck(deckId).then(() => {
    //         goBack()
    //     })
     
    // }

    const handleQuiz = () => {
        if (deck.questions.length >= 1) {
            navigation.navigate("Quiz", { deckId: deckId })
       }
    }
    return (
        <SafeAreaView style={styles.container}>
           
            <View style={styles.item}>
                <Text style={styles.title}> { deck? deck.title:null}</Text>
                <Text style={styles.cardLenght}> {deck.questions.length > 1 ? ` ${deck.questions.length } cards`: ` ${deck.questions.length } card` }</Text>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity style={styles.cardBtn} onPress={()=>navigation.navigate('Question', {deckId: deckId})}>
                    <Text style={styles.text}> Add Card</Text>
                </TouchableOpacity>
                
                    <TouchableOpacity style={styles.quizCard} onPress={() => handleQuiz()}>
                        <Text style={styles.textQuiz}> Start Quiz</Text>
                    </TouchableOpacity>
                  
                
            
          </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    
    item: {
        marginLeft: 15,
        marginRight: 15,
        justifyContent: "center",
        alignItems:"center",
        flex: 1,
    },

    title: {
        fontSize: 36,
        padding: 10,
        margin: 10
    },
    cardLenght: {
        fontSize: 22
    },
    btn: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },

    cardBtn: {
        backgroundColor: white,
        borderRadius: 10,
        borderWidth: 1,
        alignItems:"center",
        color: white,
        width: "80%",
        fontSize: 30,
        margin: 20,
        padding: 20
    },
    text: {
        fontSize: 25,
    },

    textQuiz: {
        fontSize: 25,
        color: white,

    },
    quizCard: {
        backgroundColor: "black",
        borderRadius: 10,
        borderWidth: 1,
        alignItems:"center",
        width: "80%",
        fontSize: 30,
        padding: 20
    }
})

function mapStateToProps(state, {route}) {
    const {deckId} = route.params;
    return ({
            deckId,
            deck: state[deckId]
        }
    )
}

function mapDispatchToProps(dispatch, {route, navigation}) {
    // const {deckId} = route.params;
    return {
        goBack: () => navigation.goBack()
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

