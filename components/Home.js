import React,{useEffect, useState} from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { purple, red, white } from "../utils/colors"
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDecks } from "../utils/_API_";
import { connect } from 'react-redux';
import { receiveDecks } from "../actions/index";


const Separator = () => (
    <View style={styles.separator} />
  );

const Item = ({ title, questions, navigation }) => (
    <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('udacicard', {deckId: title})}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{ fontSize: 20 }}> {questions && questions.length ===1 ? `${questions.length} card` : `${questions.length} cards`}</Text>
        <Separator/>
    </TouchableOpacity>
 
);
  
function Home(props) {

  const { navigation, data, arrayIds } = props;
  const renderItem = ({ item }) => (
    // console.log(item)
      item?(
      <Item title={item} questions={data[item].questions} navigation={navigation} key={ item}/>
      ): <Text> No Deck added yet! </Text>
    );
  
  useEffect(() => {
    const { dispatch } = props
        getDecks().then(result => 
          dispatch(receiveDecks(result))
        ).then(({ decks }) => {
          if (!decks) {
           navigation.navigate('Add Decks')
         }
       })
       
      }, [])

 
    return (
            
        <FlatList
          data={arrayIds}
          renderItem={renderItem}
          keyExtractor={item => item}
          contentContainerStyle={{
            flexGrow: 1,
          }}
         
        />
      
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: red,
      padding: 4,
      marginVertical: 6,
        marginHorizontal: 16,
      alignItems: "center",

        borderBottomWidth: 5
    
    },
    title: {
        fontSize: 32,
        color:white,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
});

function mapStateToProps(state) {
  const array = Object.keys(state);
  console.log(array)
  return {
    data: state,
    arrayIds: array
  }
}


  

export default connect(mapStateToProps)(Home);
