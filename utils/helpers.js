import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIFICATION_KEY = 'flashcard:notifications'


// export function getDailyReminderValue() {
//     return({
//       today: "Don't forget to take your quiz today",
//     });
//   }



export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then( Notifications.cancelAllScheduledNotificationsAsync())
}
function createNotification () {
  return {
    title: 'Quiz!',
    body: "👋 don't forget to do your quizå",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}


export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
       
        Notifications.requestPermissionsAsync().then(({ granted }) => {
          if (granted) {
           
            Notifications.cancelAllScheduledNotificationsAsync().then(() => {
              let tommorow = new Date();
              tommorow.setDate(tommorow.getDate() + 1);
              tommorow.setHours(20);
              tommorow.setMinutes(0);
              Notifications.scheduleNotificationAsync({
                content: createNotification(),
                trigger: {
                  time: tommorow,
                  repeat: "day",
                },
              }).then(() => {
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              });
            });
          }
        });
      }
    });
}






  // export async function alertIfRemoteNotificationsDisabledAsync() {
  //   const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //   if (status !== 'granted') {
  //     alert('Hey! Dont forget to take your quiz');
  //   }
  // }