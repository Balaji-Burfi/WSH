/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  ImageBackground,
  Image,
  BackHandler,
  Alert,
  Platform,
} from 'react-native';
import { Container, View, Button, Text, Icon, Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import * as clockActions from '../../action-reducer/clock/clockActions';
import { Colors, Labels, ScreenName, Icons } from '../../constants/constant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';


function ClockV2({ navigation }) {

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [coords, setCoords] = useState(null);
  const [locationError, setLocationError] = useState(true);
  const clockStatus = useSelector((state) => state.clock.clockInOutStatuses);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: true,
      swipeEnabled: true,
    });
  }, [navigation]);
  console.log('s-s-s>>>>>>>>>>>>>>>Coroorss', coords);

  // debugging purposes
  useEffect(() => {
    console.log("DEBUG ->", coords)
  }, [coords])
  // end of debugging

  const getLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      (info) => {

        if (info.coords) {
          if (info.coords.latitude !== 0 && info.coords.longitude !== 0) {
            setCoords(info.coords)
            setLocationError(false);
          } else {
            setLocationError(true);
          }
        } else {
          console.log("ERROR");
        }
        setLoading(false);
      },
      (error) => {
        console.log(error);
        if (error && error.code) {
          Alert.alert(
            "Error",
            error.message,
            [
              {
                text: "OK",
                style: "default"
              }
            ]
          )
        }
        setLoading(false);
        setLocationError(true);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const getStatus = () => {
    dispatch(
      clockActions.GetClockInAndOutStatusV2(() => { }),
    );
  };

  useEffect(() => {
    Geolocation.setRNConfiguration({
      authorizationLevel: "whenInUse"
    });

    async function getLocationAsync() {
      if (Platform.OS === "ios") {
        Geolocation.requestAuthorization();
      }
      await getLocation();
    }

    async function getStatusAsync() {
      await getStatus();
    }
    getStatusAsync();
    getLocationAsync();
  }, []);

  useEffect(() => {
    console.log("TEST");
    console.log(coords);
    if (clockStatus?.sheduleId && coords) {
      console.log(clockStatus);
      if (coords.longitude !== 0 && coords.latitude !== 0) {
        dispatch(
          clockActions.locationTracking({
            sheduleId: clockStatus.sheduleId,
            locationId: clockStatus.location._id,
            latitude: coords.latitude,
            longitude: coords.longitude,
          }),
        );
        setLocationError(false);
      } else {
        setLocationError(true);
      }
    }
  }, [clockStatus]);

  const askPermissions = (data, isCheckIn) => {
    Alert.alert(
      `${isCheckIn ? 'Clock In' : 'Clock Out'}`,
      `${isCheckIn
        ? 'Are you sure you want to clock in?'
        : 'Are you sure you want to clock out?'
      }`,
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(clockActions.updateCheckInOrOutV2(data, isCheckIn));
          },
        },
      ],
      { cancelable: false },
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
          style={{ marginLeft: 25, color: Colors.white }}
        />
        <Text style={{ marginLeft: 10, color: Colors.white, fontWeight: 'bold' }}>
          {Labels.clock}
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {clockStatus?.isSchedule ? (
          <View style={styles.content1}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text
                style={{
                  marginLeft: '5%',
                  marginTop: '6%',
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: Colors.green,
                }}>
                {Labels.clockIn}
              </Text>
              {
                locationError ? (
                  <View
                    style={{
                      marginRight: '5%',
                      marginTop: '6%'
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        getLocation()
                      }}
                      style={{
                        backgroundColor: "crimson",
                        borderRadius: 3,
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}>
                      <Icon type="SimpleLineIcons" name="reload" style={{ fontSize: 15, color: "white", marginRight: 5 }} />
                      <Text style={{ color: "white", fontSize: 17, }}>Location Not Found</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      marginRight: '5%',
                      marginTop: '6%'
                    }}>
                    <View
                      style={{
                        backgroundColor: "green",
                        borderRadius: 3,
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        alignItems: "center"
                      }}>
                      <Text style={{ color: "white", fontSize: 17, }}>Location Found</Text>
                    </View>
                  </View>
                )
              }
            </View>
            <View style={styles.content2}>
              <Text
                style={{
                  marginTop: '5%',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.black,
                }}>
                {Labels.projectPlace}
              </Text>
              <Text
                style={{
                  marginTop: '3%',
                  fontWeight: 'bold',
                  color: Colors.green,
                }}>
                {clockStatus.location.locationName}
              </Text>
              <Text
                style={{
                  marginTop: '8%',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.black,
                }}>
                {Labels.shiftTiming}
              </Text>
              <Text
                style={{
                  marginTop: '3%',
                  fontWeight: 'bold',
                  color: Colors.green,
                }}>
                {clockStatus.shift && (clockStatus.forDate ? moment(clockStatus.forDate).format("DD/MM/YYYY") : "")}

              </Text>
              <Text
                style={{
                  marginTop: '3%',
                  fontWeight: 'bold',
                  color: Colors.green,
                }}>
                {clockStatus.shift.shiftName}
              </Text>
              {clockStatus.shift && (
                <>
                  {!clockStatus.isCheckIn ? (
                    <TouchableOpacity
                      onPress={() => {
                        askPermissions(
                          {
                            shiftId: clockStatus.sheduleId,
                            checkInLatitude: coords?.latitude
                              ? coords?.latitude
                              : 0,
                            checkInLongitude: coords?.longitude
                              ? coords?.longitude
                              : 0,
                          },
                          true,
                        );
                      }}
                      style={{
                        width: 120,
                        height: 120,
                        margin: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 60,
                        backgroundColor: Colors.orange,
                      }}>
                      <Text style={{ fontWeight: 'bold', color: Colors.white }}>
                        {Labels.clockIn}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          width: 120,
                          margin: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 60,
                          backgroundColor: Colors.grey,
                        }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.white }}>
                          {Labels.clockIn}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          askPermissions(
                            {
                              shiftId: clockStatus.sheduleId,
                              checkInLatitude: coords?.latitude
                                ? coords?.latitude
                                : 0,
                              checkInLongitude: coords?.longitude
                                ? coords?.longitude
                                : 0,
                            },
                            false,
                          );
                        }}
                        style={{
                          width: 120,
                          height: 120,
                          margin: 20,
                          marginLeft: 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 60,
                          backgroundColor: Colors.red,
                        }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.white }}>
                          {Labels.clockOut}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}

            </View>
          </View>
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{ fontWeight: 'bold', fontSize: 20, color: Colors.black }}>
              You don't have any schedule
            </Text>
          </View>
        )}
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
  content1: {
    height: '100%',
    width: '100%',
  },
  content2: {
    alignItems: 'center',
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

export default ClockV2;
