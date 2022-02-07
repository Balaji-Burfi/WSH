import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Icon, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  StatusBar, StyleSheet, TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../../action-reducer/login/loginActions';
import {
  ScreenName,
  Colors, Icons, Labels, privileges,
} from '../../constants/constant';
import { drawerConstants } from '../../constants/drawerConstants';

function Dashboard({ navigation }) {
  const [role, setRole] = useState('0');
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
      }
      updatedRole();
    } else {
      setRole('3') // set to Employee if apiVersion is v2
    }
  }, [userData]);

  // console.log('s-s-s>>>>>>>>>>>>>>>>>>>.', userData);
  var disabledRoutes = ['Dashboard'];
  if (!clockStatus?.isCheckIn) {
    disabledRoutes.push('Task');
  }
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
          style={{ marginLeft: 25, color: Colors.white }}
        />
        <Text style={{ marginLeft: 10, color: Colors.white, fontWeight: 'bold' }}>
          {Labels.Dashboard}
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <View style={styles.mainView}>
        <View style={styles.subView}>
          <View
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: '25%',
            }}>
            {role &&
              drawerConstants.map((drawer, i) => {
                return (
                  privileges[role].includes(drawer.pathName) &&
                  !disabledRoutes.includes(drawer.pathName) && (
                    <TouchableOpacity
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
                      }}
                      style={{
                        marginTop: 8,
                        marginBottom: 8,
                        width: '50%',
                        height: '20%',
                      }}
                      key={`drawer-${i}`}>
                      <View
                        style={{
                          borderColor: 'black',
                          borderWidth: 1,
                          margin: 10,
                          backgroundColor: 'green',
                          width: '90%',
                          height: '90%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          // flexDirection: 'column',
                        }}>
                        <Icon
                          style={{ color: Colors.white, fontSize: 30 }}
                          type={drawer.icon.type}
                          name={drawer.icon.name}
                        />
                        <Text
                          style={{
                            marginTop: '2%',
                            width: '100%',
                            textAlign: 'center',
                            color: Colors.white,
                            // fontSize:20,
                            fontWeight: 'bold',
                          }}>
                          {drawer.label.toUpperCase()}
                        </Text>
                      </View>
                      {/* <DrawerItem
                        icon={() => (
                          <Icon
                            style={{color: Colors.white}}
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
                              routes: [{name: drawer.pathName}],
                            });
                          } else {
                            navigation.navigate(drawer.pathName);
                          }

                          // Navigate using the `navigation` prop that you received
                        }}
                      />
                      {drawerConstants.length - 1 !== i && (
                        <View style={styles.horizontalRule} />
                      )} */}
                    </TouchableOpacity>
                  )
                );
              })}
          </View>
        </View>

        {/* <DrawerItemList {...props} /> */}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  mainView: { flex: 1 },
  backIcon: { margin: 10, color: Colors.white },
  subView: { margin: 10 },
  usetProfile: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  userName: { color: Colors.black, fontSize: 20, fontWeight: 'bold' },
  userType: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  imageBackground: {
    backgroundColor: Colors.black,
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  drawerListView: { margin: 2 },
  drawerItemView: {
    marginTop: 8,
    marginBottom: 8,
    width: '30%',
    height: '15%',
  },
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

export default Dashboard;
