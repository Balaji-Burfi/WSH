/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  BackHandler,
  Linking,
} from 'react-native';
import {
  Container,
  View,
  Button,
  Text,
  Icon,
  Picker,
  Form,
  Label,
  Card,
  CardItem,
  Body,
  Textarea,
  Right,
  Spinner,
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../action-reducer/login/loginActions';
import {Colors, Labels, ScreenName, Icons} from '../../constants/constant';
// import TaskTable from './TaskTable';
import ImagePicker from 'react-native-image-picker';
import * as taskActions from '../../action-reducer/task/taskActions';
import {useFocusEffect} from '@react-navigation/native';
import {
  getShiftsForSupervisorCurrent,
  getLocationsForSupervisorCurrent,
  getEmployeesForshiftAndLocations,
} from '../../action-reducer/employee/employeeActions';

export default function Employees({navigation}) {
  const dispatch = useDispatch();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);

  const locations = useSelector((state) => state.employee.locations);
  const shifts = useSelector((state) => state.employee.shifts);
  const employees = useSelector((state) => state.employee.employees);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    dispatch(
      getLocationsForSupervisorCurrent(() => {
        setLoading(false);
      }),
    );
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setSelectedLocation(null);
      setSelectedShift(null);
      setLoading(true);
      dispatch(
        getLocationsForSupervisorCurrent(() => {
          setLoading(false);
        }),
      );
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  const openDialer = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
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
          {Labels.Employees}
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <ScrollView
        // style={styles.scroll}
        // contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={{margin: '3%'}}>
          <View style={{margin: '2%', marginTop: '5%'}}>
            <Text
              style={{
                fontSize: 20,
                color: Colors.lightBlack,
                marginBottom: 10,
              }}>
              Location
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: Colors.grey,
                backgroundColor: '#ecf0f1',
                width: '100%',
                justifyContent: 'center',
              }}>
              <Picker
                mode="dropdown"
                iosHeader="Location"
                iosIcon={<Icon name="caret-down"  type="FontAwesome"/>}
                style={{width: '100%', fontSize: 20}}
                selectedValue={selectedLocation}
                onValueChange={(value) => {
                  setLoading(true);
                  setSelectedLocation(value);
                  dispatch(
                    getShiftsForSupervisorCurrent({locationId: value}, () => {
                      setLoading(false);
                    }),
                  );
                }}>
                {[
                  {locationName: 'Select Location', _id: null},
                  ...locations,
                ].map((location) => {
                  return (
                    <Picker.Item
                      key={location._id}
                      label={location.locationName}
                      value={location._id}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          <View style={{margin: '2%', marginTop: '5%'}}>
            <Text
              style={{
                fontSize: 20,
                color: Colors.lightBlack,
                marginBottom: 10,
              }}>
              Shift
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: Colors.grey,
                backgroundColor: '#ecf0f1',
                // margin: 20,
                width: '100%',
                justifyContent: 'center',
              }}>
              <Picker
                mode="dropdown"
                iosHeader="Shift"
                iosIcon={<Icon name="caret-down"  type="FontAwesome"/>}
                style={{width: '100%', fontSize: 20}}
                selectedValue={selectedShift}
                onValueChange={(value) => {
                  setLoading(true);
                  setSelectedShift(value);
                  dispatch(
                    getEmployeesForshiftAndLocations(
                      {
                        locationId: selectedLocation,
                        shiftId: value,
                      },
                      () => {
                        setLoading(false);
                      },
                    ),
                  );
                }}>
                {[{shiftName: 'Select Shift', _id: null}, ...shifts].map(
                  (shift) => {
                    return (
                      <Picker.Item label={shift.shiftName} value={shift._id} />
                    );
                  },
                )}
              </Picker>
            </View>
          </View>
          <View style={{margin: '2%', marginTop: '5%'}}>
            <Text
              style={{
                fontSize: 20,
                color: Colors.lightBlack,
                marginBottom: 10,
              }}>
              Employees
            </Text>
            {selectedLocation &&
              selectedShift &&
              employees.map((employee) => {
                return (
                  <Card>
                    <CardItem>
                      <Body>
                        <Text>{employee.employeeName}</Text>
                        <Text>{employee.phoneNumber}</Text>
                      </Body>
                      <Right>
                        <Icon
                          onPress={() => openDialer(employee.phoneNumber)}
                          style={{fontSize: 30, color: Colors.green}}
                          type={'MaterialIcons'}
                          name="call"
                        />
                      </Right>
                    </CardItem>
                  </Card>
                );
              })}
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
