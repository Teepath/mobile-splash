import React, {useState, useEffect} from 'react'
import { SafeAreaView, View,  StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { red, white, green } from "../utils/colors"
import {
    clearLocalNotification,
    setLocalNotification,
    // alertIfRemoteNotificationsDisabledAsync
  } from "../utils/helpers";

import { connect } from 'react-redux';

function QuizCard(props) {
    const { deck, goBack } = props;
    const [is_answer, setAnswer] = useState(false)
    const [index, setIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [total, setTotal] = useState(1)
    const [done, setDone] = useState(false)
    const handleFlip = () => {
        setAnswer(!is_answer)
    }

    const questionL = deck.length;
    console.log("length", questionL)

    useEffect(() => {
        if (total <= 1) {
          clearLocalNotification().then(setLocalNotification)
        }
    
    }, [])

    

    const handleCorrect = () => {
        let totalQ = deck.length - 1;
        let aggre = score + 1;
        if (index === totalQ) {
            setTotal(Math.ceil((aggre / questionL ) * 100) + "%")
            setDone(true)
          
            alert(" No more quiz to display");
          
        }else { 
            setIndex(index + 1);
            setAnswer(false)
            setScore(score + 1)
            }      
    }

    console.log('score', score)

    const handleIncorect = () => {
     
        let totalQ = deck.length-1;
        if (index === totalQ) {
            setTotal(Math.floor((score/questionL) * 100) + "%")
            setDone(true)
          
                alert(" No more quiz to display")
              
            } else {      
            setIndex(index + 1);
            setAnswer(false)
                }
             
        
        
    }

    const handleRetake = () => {
        setIndex(0)
        setDone(false)
        setTotal(1)
        setScore(0)
    }

    if (deck) {
        return (
            <SafeAreaView style={styles.container}>
    
                <Text style={styles.text}> {`${index + 1}/${deck.length}`}</Text>
                <View style={styles.question}>
                    <Text style={styles.text}>{!is_answer ? deck[index].question : deck[index].answer} </Text>
                    <TouchableOpacity onPress={() => handleFlip()}>
                        <Text style={{ color: red, fontSize: 25 }} >{!is_answer ? 'Answer' : 'Question'} </Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 25, color: "black" }}>{total === 1 ? null : total}</Text>
                </View>
                {!done ?
                    <View style={styles.btnWrapper}>
                        <TouchableOpacity style={styles.correct} onPress={() => handleCorrect()}>
                            <Text style={styles.textBtn}> Correct </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardBtn} onPress={() => handleIncorect()}>
                            <Text style={styles.textBtn}> Incorrect</Text>
                        </TouchableOpacity>
                 
                    </View>
                    :
                    <View style={styles.btnWrapper}>
                        <TouchableOpacity style={styles.correct} onPress={() => handleRetake()}>
                            <Text style={styles.textBtn}> Retake Quiz </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardBtn} onPress={() => goBack()}>
                            <Text style={styles.textBtn}> Go back to Deck</Text>
                        </TouchableOpacity>
             
                    </View>
                }
            </SafeAreaView>
        )
    } else {
        return (
            <View style={{flex:1, justifyContent:"cwenter", alignItems:"center"}}>
                <Text> No quiz submited yet</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    question: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        
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
        alignItems:"center",
        color: white,
        width: "80%",
        fontSize: 30,
        margin: 20,
        padding: 20
    },

    correct: {
        backgroundColor: green,
        borderRadius: 10,
        borderWidth: 0,
        alignItems:"center",
        color: white,
        width: "80%",
        fontSize: 30,
        margin: 20,
        padding: 20
    },
    btnWrapper: {
        justifyContent: "center",
        alignItems:"center"
    }

})


function mapStateToProps(state, {route, navigation}) {
    const { deckId } = route.params;
    console.log('question', state[deckId].questions)
    return ({
            deckId,
        deck: state[deckId].questions? state[deckId].questions: null
        }
    )
}

function mapDispatchToProps(dispatch, {route, navigation}) {
    const {deckId} = route.params;
    return {
        goBack: () => navigation.goBack()
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizCard);
