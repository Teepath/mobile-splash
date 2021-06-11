
import React, { Component } from 'react';
import { Provider } from "react-redux";
import { createStore } from "redux";
import {  View, StatusBar, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack';
import reducer from "./reducers/index";

import AddCardBox from "./components/AddCard";
import Home from "./components/Home"
import QuizCard from "./components/QuizCard";
import NewDeck from "./components/NewDeck";
import NewQuestion from "./components/AddQuestion";
import { red, white, purple } from './utils/colors';

import Constants from "expo-constants";


const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

const TabNav = () => (<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let icon
      if (route.name === 'Add Decks') {
        icon = (
          <FontAwesome name="plus-square" size={size} color={color} />
        )
      } else if (route.name === 'Decks') {
        icon = (
          <Ionicons name="ios-bookmarks" size={size} color={color} />
        )
      } 

      return icon
    },
  })}
  tabBarOptions={{
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      backgroundColor: Platform.OS === 'ios' ? white : purple,
    },
    indicatorStyle: {
     
      backgroundColor: 'yellow',
    },
  }}
>
  <Tab.Screen name="Decks" component={Home} />
  <Tab.Screen name="Add Decks" component={NewDeck} />
</Tab.Navigator>
);


const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator headerMode="screen" initialRouteName="Decks">
    
        <Stack.Screen
            name="Decks"
            component={TabNav}
            options={{headerShown: false}}/>
        <Stack.Screen
            name="Add Decks"
            component={NewDeck}
            options={{
                headerTintColor: red, headerStyle: {
                    backgroundColor: purple,
                }
      }} />
    <Stack.Screen
            name="AddCard"
            component={AddCardBox}
            options={{
                headerTintColor: white, headerStyle: {
                    backgroundColor: purple,
                }
      }} />
    <Stack.Screen
            name="udacicard"
            component={AddCardBox}
            options={{
                headerTintColor: white, headerStyle: {
                    backgroundColor: purple,
                }
      }} />
      <Stack.Screen
            name="Quiz"
            component={QuizCard}
            options={{
                headerTintColor: white, headerStyle: {
                    backgroundColor: purple,
                }
      }} />
    
    <Stack.Screen
            name="Question"
            component={NewQuestion}
            options={{
                headerTintColor: white, headerStyle: {
                    backgroundColor: purple,
                }
            }}/>
    </Stack.Navigator>
);

function UdaciStatusBar({ backgroundColor, ...props }) {

  return (
    <View style={{backgroundColor, height:Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
  
} 

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <NavigationContainer>
              <UdaciStatusBar backgroundColor={ purple} barStyle="light-content"/>
        <MainNav/>
        </NavigationContainer>
        </Provider>
    )
  }
}



export default App;
