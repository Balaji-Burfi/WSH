/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, Icon, Switch } from 'native-base';
import {
  Icons,
  Colors,
  ScreenName,
  roles,
  privileges,
} from '../../constants/constant';
import { drawerConstants } from '../../constants/drawerConstants';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../../action-reducer/login/loginActions';

export default function CustomDrawer({ backIcon, navigation }) {
  const [role, setRole] = useState('2');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);
  const clockStatus = useSelector((state) => state.clock.clockInOutStatuses);
  const [apiVersion, setApiVersion] = useState('v1');

  useEffect(() => {
    AsyncStorage.getItem('apiVersion').then(value => setApiVersion(value));
  }, [])


  useEffect(() => {
    if (userData && userData?._id) {
      const updatedRole = async () => {
        await AsyncStorage.getItem('role').then((localRole) => {
          if (localRole) {
            setRole(localRole);
          } else {
            setRole(userData.role);
          }
        });
      };
      updatedRole();
    } else {
      setRole('3');
    }
  }, [userData]);

  const changeRole = async (selectedRole) => {
    await AsyncStorage.setItem('role', selectedRole).then((data) => {
      let path = selectedRole === '2' ? 'Employees' : 'Clock';
      // console.log('s-s-s>>>>>>>>>>>>>>>>pathh', path);
      setRole(selectedRole);
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenName.Dashboard }],
      });
    });
  };
  var disabledRoutes = [];
  if (!clockStatus?.isCheckIn) {
    disabledRoutes.push('Task');
  }
  return (
    <View style={styles.mainView}>
      <DrawerContentScrollView>
        {!backIcon && (
          <View>
            <TouchableOpacity>
              <Icon
                type={Icons.MaterialIcons}
                name={Icons.arrowBack}
                style={styles.backIcon}
                onPress={() => navigation.closeDrawer()}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.subView}>
          <View style={styles.usetProfile}>
            <ImageBackground style={styles.imageBackground}>
              <Image
                style={{ width: 60, height: 60 }}
                source={require('../../assets/images/user.png')}
              />
            </ImageBackground>
            <Text style={styles.userName}>{userData?.userName}</Text>
            {userData && (
              <Text style={styles.userType}>{roles[userData.role]}</Text>
            )}
          </View>
          <View style={styles.drawerListView}>
            {role &&
              drawerConstants.map((drawer, i) => {
                return (
                  privileges[role].includes(drawer.pathName) &&
                  !disabledRoutes.includes(drawer.pathName) && (
                    <View style={styles.drawerItemView} key={`drawer-${i}`}>
                      <DrawerItem
                        icon={() => (
                          <Icon
                            style={{ color: Colors.white }}
                            type={drawer.icon.type}
                            name={drawer.icon.name}
                          />
                        )}
                        labelStyle={styles.drawerLableStyle}
                        label={drawer.label}
                        onPress={async () => {
                          if (drawer.label === 'Logout') {
                            await AsyncStorage.removeItem('userToken');
                            await AsyncStorage.removeItem('role');
                            dispatch(loginActions.resetUser());
                            navigation.reset({
                              index: 0,
                              routes: [{ name: drawer.pathName }],
                            });
                          } else {
                            navigation.navigate(apiVersion === "v2" && drawer.pathName !== ScreenName.Dashboard ? drawer.pathName + 'V2' : drawer.pathName);
                          }

                          // Navigate using the `navigation` prop that you received
                        }}
                      />
                      {drawerConstants.length - 1 !== i && (
                        <View style={styles.horizontalRule} />
                      )}
                    </View>
                  )
                );
              })}
            {userData && userData?.role === '2' && (
              <View style={styles.switchView}>
                <Text style={styles.switchText}>Switch to Employee</Text>
                <Switch
                  onValueChange={() => changeRole(role === '3' ? '2' : '3')}
                  value={role === '3'}
                />
              </View>
            )}
          </View>
        </View>

        {/* <DrawerItemList {...props} /> */}
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: { flex: 1, backgroundColor: '#3e9b52' },
  backIcon: { margin: 10, color: Colors.white },
  subView: { margin: 25 },
  usetProfile: { justifyContent: 'center', alignItems: 'center' },
  userName: { color: Colors.white, fontSize: 20, fontWeight: 'bold' },
  userType: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  imageBackground: {
    backgroundColor: Colors.white,
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  drawerListView: { margin: 2 },
  drawerItemView: { marginTop: 8, marginBottom: 8 },
  drawerLableStyle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#F0F8FF',
  },
  switchView: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: Colors.white,
  },
  horizontalRule: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
});
