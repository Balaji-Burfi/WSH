/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Route from './src/routes/index';
import { Provider } from 'react-redux';
import store from './src/store/index';
import { checkMultiple, PERMISSIONS, request } from 'react-native-permissions';
import { SafeAreaView, View, StyleSheet, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic'
import AsyncStorage from '@react-native-async-storage/async-storage';

// To see all the requests in the chrome Dev tools in the network tab.
// XMLHttpRequest = GLOBAL.originalXMLHttpRequest
//   ? GLOBAL.originalXMLHttpRequest
//   : GLOBAL.XMLHttpRequest;

// // fetch logger
// global._fetch = fetch;
// global.fetch = function (uri, options, ...args) {
//   return global._fetch(uri, options, ...args).then((response) => {
//     console.log('Fetch', {request: {uri, options, ...args}, response});
//     return response;
//   });
// };
const App = () => {
  const {
    CAMERA,
    READ_EXTERNAL_STORAGE,
    ACCESS_COARSE_LOCATION,
    ACCESS_FINE_LOCATION,
  } = PERMISSIONS.ANDROID;

  const {
    LOCATION_WHEN_IN_USE
  } = PERMISSIONS.IOS;

  //callback hell
  const askPermissions = () => {
    checkMultiple([
      CAMERA,
      READ_EXTERNAL_STORAGE,
      ACCESS_COARSE_LOCATION,
      ACCESS_FINE_LOCATION,
      LOCATION_WHEN_IN_USE
    ]).then((statuses) => {
      if (Platform.OS === "ios") {
        if (statuses[LOCATION_WHEN_IN_USE] == 'unavailable' || 'denied' || 'blocked') {
          request(LOCATION_WHEN_IN_USE);
        }
      }
      if (statuses[CAMERA] == 'unavailable' || 'denied' || 'blocked') {
        request(CAMERA).then((result) => {
          if (result == 'granted') {
            if (
              statuses[READ_EXTERNAL_STORAGE] == 'unavailable' ||
              'denied' ||
              'blocked'
            ) {
              request(READ_EXTERNAL_STORAGE).then((result) => {
                if (result == 'granted') {
                  if (
                    statuses[Platform.select({
                      android: ACCESS_COARSE_LOCATION,
                      ios: LOCATION_WHEN_IN_USE
                    })] == 'unavailable' ||
                    'denied' ||
                    'blocked'
                  ) {
                    request(Platform.select({
                      android: ACCESS_COARSE_LOCATION,
                      ios: LOCATION_WHEN_IN_USE
                    })).then((result) => {
                      if (result == 'granted') {
                        if (
                          statuses[ACCESS_FINE_LOCATION] == 'unavailable' ||
                          'denied' ||
                          'blocked'
                        ) {
                          request(ACCESS_FINE_LOCATION)
                        }
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    });
  };

  const askNotificationPermissions = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('===????????????????Authorization status:', authStatus);
    }
  };

  useEffect(() => {
    askNotificationPermissions();
    askPermissions();
  }, []);

  const dynamicStyles = new DynamicStyleSheet({
    rootContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: new DynamicValue('white', 'black'),
    }
  });


  const styles = useDynamicValue(dynamicStyles)

  return (
    <NavigationContainer>
      <Provider store={store}>

        <SafeAreaView style={styles.rootContainer}>
          <Route />
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
