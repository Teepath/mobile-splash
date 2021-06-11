import AsyncStorage from "@react-native-async-storage/async-storage";


const deckGame = "@deck:key"

export const saveDeckTitle = async (title) => {
  
        const data = JSON.stringify({
            [title]: {
                title: title,
                questions: []
            },
        })
    
    // AsyncStorage.setItem(deckGame, data)
    // console.log(data)
    // AsyncStorage.clear()
    await AsyncStorage.mergeItem(deckGame, data)
    console.log('Saving Done')
  
}


export const addCardToDeck = async (title, card) => {
    let deck = await AsyncStorage.getItem(deckGame)
    let response =await JSON.parse(deck);
  
    response[title] = {
        ...response[title],
        questions:[...response[title].questions, card]
    }
 console.log("response" ,JSON.stringify(response))

        AsyncStorage.mergeItem(deckGame, JSON.stringify(response))
}

export const getDeck = async (id) => {
    let items = await AsyncStorage.getItem(deckGame);
    let data = JSON.parse(items);
    console.log(data[id])
        return data[id]
}


export const getDecks = async () => {
    // console.log('Loading');
    // let keys = await AsyncStorage.getAllKeys()
    let items = await AsyncStorage.getItem(deckGame);
    console.log("items", JSON.parse(items))
    // console.log('Loading Done!')
    return JSON.parse(items);
    // console.log(data);
  
}


export const removeDeck  =async  (key) => {
 
         let results = await AsyncStorage.getItem(deckGame)
            const data = JSON.parse(results);
            data[key] = undefined;
            delete data[key];
            return AsyncStorage.setitem(deckGame, JSON.stringify(data)); 
  }