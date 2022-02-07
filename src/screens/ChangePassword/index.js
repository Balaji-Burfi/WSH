import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Container, View, Button, Text, Icon, Spinner} from 'native-base';
import Background from '../../images/background.png';
import Logo from '../../images/logo1.png';
import {Colors, Labels, ScreenName, Icons} from '../../constants/constant';
import {useForm} from './passwordValidation';
import {useDispatch} from 'react-redux';
import * as actions from '../../action-reducer/login/loginActions';

function ChangePassword({navigation}) {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // const [password, setLoginError] = useState(false);
  // const {values, errors, handleChange, handleSubmit} = useForm(loginFunction);

  const handleSubmit = () => {
    setSubmitting(true);
    setLoading(true);
    dispatch(
      actions.changePassword(
        credentials,
        () => {
          alert('Password changed successfully');
          setLoading(false);
        },
        () => {
          alert('Failed to change password!');
          setLoading(false);
        },
      ),
    );
  };

  useEffect(() => {
    if (submitting) {
      if (!credentials.newPassword) {
        setNewPasswordError('New password is required');
        return;
      } else if (credentials.newPassword.length < 8) {
        setNewPasswordError('New Password must be 8 or more characters');
      } else {
        setNewPasswordError('');
      }

      if (!credentials.confirmPassword) {
        setConfirmPasswordError('Confirm password is required');
      } else if (credentials.confirmPassword.length < 8) {
        setConfirmPasswordError(
          'Confirm password must be 8 or more characters',
        );
      } else if (credentials.confirmPassword !== credentials.newPassword) {
        setConfirmPasswordError('Password and confirm password does not match');
      } else {
        setConfirmPasswordError('');
      }
    }
  }, [submitting, credentials]);

  const isNotValid = () => {
    return (
      confirmPasswordError.length > 0 ||
      newPasswordError.length > 0 ||
      credentials.confirmPassword.length === 0 ||
      credentials.newPassword.length === 0
    );
  };

  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.green,
          height: 60,
        }}>
        <Icon
          onPress={() => navigation.openDrawer()}
          type={Icons.entypo}
          name={Icons.menu}
          style={{marginLeft: 25, color: Colors.white}}
        />
        <Text style={{marginLeft: 10, color: Colors.white, fontWeight: 'bold'}}>
          {Labels.changePassword}
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.image}>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry
              style={styles.inputStyle}
              placeholder={Labels.newPassword}
              blurOnSubmit={true}
              maxLength={30}
              autoCapitalize={Labels.none}
              placeholderTextColor={Colors.black}
              value={credentials.newPassword}
              onChangeText={(text) => {
                setCredentials({...credentials, newPassword: text});
              }}
              underlineColorAndroid={Colors.transparent}
            />
            {newPasswordError.length > 0 && (
              <Text style={styles.error}>{newPasswordError}</Text>
            )}
            <TextInput
              secureTextEntry
              style={{...styles.inputStyle, marginTop: '5%'}}
              placeholder={Labels.cpassword}
              blurOnSubmit={true}
              maxLength={30}
              autoCapitalize={Labels.none}
              placeholderTextColor={Colors.black}
              value={credentials.confirmPassword}
              onChangeText={(text) => {
                setCredentials({...credentials, confirmPassword: text});
              }}
              underlineColorAndroid={Colors.transparent}
            />
            {confirmPasswordError.length > 0 && (
              <Text style={styles.error}>{confirmPasswordError} </Text>
            )}
            <View>
              <Button
                disabled={isNotValid()}
                onPress={handleSubmit}
                style={{
                  ...styles.button,
                  backgroundColor: isNotValid() ? 'grey' : 'green',
                }}
                block>
                <Text style={{fontWeight: 'bold'}}>
                  {Labels.changePassword}
                </Text>
              </Button>
              {/* {errors.login && (
                <Text style={styles.error}>{errors.changePassword}</Text>
              )} */}
            </View>
            {/* <TouchableOpacity
                onPress={() => navigation.navigate(ScreenName.login)}>
                <Text style={styles.cpLink}>{Labels.loginLink}</Text>
              </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: '10%',
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
  cpLink: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
  inputStyle: {
    width: '100%',
    borderBottomWidth: 1,
    // borderBottomColor: Colors.green,
    color: Colors.green,
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
    borderRadius: 10,
    justifyContent: 'center',
    padding: 2,
    backgroundColor: Colors.green,
  },
  inputContainer: {
    width: '75%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChangePassword;
