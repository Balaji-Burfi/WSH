/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, View, Button, Text } from 'native-base';
import Background from '../../images/background.png';
import Logo from '../../images/logo1.png';
import { Colors, Labels, ScreenName } from '../../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../../action-reducer/login/loginActions';
import Login from '../Login';
import Clock from '../Clock';
import Employees from '../Employees';
import Dashboard from '../Dashboard';

function Landing(props) {
  const [loading, setLoading] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [role, setRole] = useState(null);
  const [newApi, setNewApi] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const validateToken = async () => {
      const onError = () => {
        setLoading(false);
        setLoginSuccess(false);
      };
      await AsyncStorage.getItem('userToken').then(async (token) => {
        console.log(token, 'token')
        if (token) {
          if (await AsyncStorage.getItem('userBased') === null) {
            await AsyncStorage.setItem('userBased', 'Link1');
          }
          const apiVersion = await AsyncStorage.getItem('apiVersion');

          if (apiVersion === "v1") {
            const onSuccess = async (userData) => {
              if (userData && userData?._id) {
                await AsyncStorage.getItem('role').then((localRole) => {
                  if (localRole) {
                    setRole(localRole);
                  } else {
                    setRole(userData.role);
                  }
                  setLoading(false);
                  setLoginSuccess(true);
                });
              }
            };
            dispatch(loginActions.getUserData(onSuccess, onError));
          } else {
            setRole('3'); // set to employee
            setLoading(false);
            setLoginSuccess(true);
            setNewApi(true);
          }
        } else {
          onError();
        }
      });
    };
    validateToken();
  }, []);
  const Element = loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <ActivityIndicator size={'large'} color={Colors.green} />
    </View>
  ) : loginSuccess ? (
    <Dashboard {...props} />
  ) : (
    <Login {...props} />
  );

  return Element;
}

export default Landing;
