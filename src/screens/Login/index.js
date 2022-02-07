import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, View, Button, Text, Spinner, Item, Picker, Icon, Form, Content } from 'native-base';
import Background from '../../images/background.png';
import Logo from '../../images/logo1.png';
import { Colors, Labels, ScreenName } from '../../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../../action-reducer/login/loginActions';
import messaging from '@react-native-firebase/messaging';

function Login({ navigation }) {
  let userItem = "Link1";
  const getUserBased = async () => {
    credentials.userBased = await AsyncStorage.getItem('userBased') === null ? "Link1" : await AsyncStorage.getItem('userBased');
  }

  const [credentials, setCredentials] = useState({
    userName: '',
    password: '',
    userBased: userItem
  });
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');
  const [loading, setLoading] = useState(false);
  const [deviceToken, setDeviceToken] = useState(null);

  // const userData = useSelector((state) => state.login.userData);
  const dispatch = useDispatch(() => {
    getUserBased();
  });

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        console.log('S-s-s>>>>>>>>>>>>>.tokeen', token);
        return setDeviceToken(token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      setDeviceToken(token);
    });
  }, []);

  const onSuccessLogin = (role) => {
    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenName.Dashboard }],
    });
  };
  const onErrorLogin = (error) => {
    setLoading(false);
    setErrorLogin(error);
  };

  return (
    <Container>
      <StatusBar backgroundColor={Colors.green} />
      <ImageBackground source={Background} style={styles.image}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.image}>
            <Image source={Logo} />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder={Labels.userName}
                placeholderTextColor={Colors.black}
                onChangeText={(text) => {
                  setErrorLogin('');
                  setCredentials({ ...credentials, userName: text });
                }}
                multiline={true}
                maxLength={20}
                blurOnSubmit={true}
                autoCapitalize={Labels.none}
                value={credentials.userName}
                underlineColorAndroid={Colors.transparent}
              />
              {submittedOnce && credentials.userName.length === 0 && (
                <Text style={styles.error}>UserName is required</Text>
              )}
              <TextInput
                secureTextEntry
                style={styles.inputStyle}
                placeholder={Labels.password}
                blurOnSubmit={true}
                maxLength={30}
                autoCapitalize={Labels.none}
                placeholderTextColor={Colors.black}
                value={credentials.password}
                onChangeText={(text) => {
                  setErrorLogin('');
                  setCredentials({ ...credentials, password: text });
                }}
                underlineColorAndroid={Colors.transparent}
              />
              {submittedOnce && credentials.password.length === 0 && (
                <Text style={styles.error}>Password is required</Text>
              )}
              <View style={styles.inputStyle}>
                <Form>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      placeholder="Please select Project"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={credentials.userBased}
                      onValueChange={(e) => {
                        if (e === "Link8" && __DEV__) {
                          setCredentials({ ...credentials, userBased: e, userName: "wsh_karthiga", password: "Adaptive*123" })
                        } else {
                          setCredentials({ ...credentials, userBased: e })
                        }
                      }}
                    >
                      <Picker.Item label="Project 1" value="Link1" />
                      <Picker.Item label="Project 2" value="Link2" />
                      <Picker.Item label="Project 3" value="Link3" />
                      <Picker.Item label="Project 4" value="Link4" />
                      <Picker.Item label="Project 5" value="Link5" />
                      <Picker.Item label="Project 6" value="Link6" />
                      <Picker.Item label="Project 7" value="Link7" />
                      <Picker.Item label="Project 8" value="Link8" />

                    </Picker>
                  </Item>
                </Form>
              </View>
              <View style={{ width: '50%' }}>
                <Button
                  onPress={() => {
                    setSubmittedOnce(true);

                    if (
                      credentials.userName.length !== 0 &&
                      credentials.password.length !== 0
                    ) {
                      setLoading(true);
                      dispatch(
                        loginActions.LoginAction(
                          { ...credentials, mobileToken: deviceToken },
                          onSuccessLogin,
                          onErrorLogin,
                        ),
                      );
                    }
                  }}
                  style={styles.button}
                  block>
                  <Text style={{ fontWeight: 'bold' }}>{Labels.login}</Text>
                </Button>
                {errorLogin.length !== 0 && (
                  <Text style={styles.error}>{errorLogin}</Text>
                )}
              </View>
              {/* <TouchableOpacity onPress={()=>navigation.navigate(ScreenName.changePassword)}>
              <Text style={styles.cpLink}>{Labels.changePasswordLink}</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            opacity: 0.7,
            zIndex: 1,
          }}>
          <Spinner size={30} />
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  cpLink: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  inputStyle: {
    width: '100%',
    borderBottomWidth: 1,
    // borderBottomColor: Colors.green,

    color: Colors.green,
    ...Platform.select({
      ios: {
        marginTop: 16,
        padding: 8,
      },
    }),
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  button: {
    marginTop: 30,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: Colors.green,
  },
  inputContainer: {
    width: '75%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
