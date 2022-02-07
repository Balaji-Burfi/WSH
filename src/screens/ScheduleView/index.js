/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import {
  Button,
  Card, Container,
  Form, Icon,
  Spinner, Text,
  Textarea, View
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Linking, Modal, ScrollView,
  StatusBar, StyleSheet,
  TouchableHighlight
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../action-reducer/login/loginActions';
import * as scheduleActions from '../../action-reducer/schedule/scheduleActions';
import { Select } from '../../components';
import { Colors, Icons, Labels } from '../../constants/constant';

const Status = {
  0: 'Logged In',
  1: 'Logged Out',
  2: 'Not yet logged in',
};

const StatusColor = {
  0: 'green',
  1: 'red',
  2: '#0000FF',
};

export default function ScheduleView({ navigation }) {
  const dispatch = useDispatch();
  function convertTo24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? '0' + h : h; // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? ' AM' : ' PM';
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  }
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);

  const userData = useSelector((state) => state.login.userData);
  const [locations, setLocations] = useState([]);
  const [modalVisible, setModalVisible] = useState('');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [locationData, setLocationData] = useState('');
  const [reasonText, setReasonText] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [shifts, setShifts] = useState([]);
  const [audits, setAudits] = useState([]);
  const [viewLocation, setViewLocation] = useState(false);


  const parseShiftTiming = (startTime, endTime) => {
    const parseTime = (time) =>
      time.includes('.')
        ? time.split('.')[0].length === 1
          ? `0${time}`
          : time
        : time.length === 1
          ? `0${time}`
          : `${time}`;
    startTime = convertTo24(parseTime(startTime));
    endTime = convertTo24(parseTime(endTime));
    return `${startTime} To ${endTime}`;
  };
  const getData = (
    forDate = moment(date).format('YYYY-MM-DD'),
    locationId = '0',
    shiftId = '0',
  ) => {
    setLoading(true);
    dispatch(
      actions.scheduleForClients(
        {
          forDate,
          locationId,
          shiftId,
          role: userData.role,
        },
        (data) => {
          (locationId === '0' &&
            setLocations(data.locations));
          (shiftId === '0' && setShifts(data.shifts));
          setAudits(data.data);
          console.log(data.shifts);
          console.log(data);
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
      ),
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (userData) {
        getData();
        setReasonText('');
        setDate(date);
      }
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
          style={{ marginLeft: 25, color: Colors.white }}
        />
        <Text style={{ marginLeft: 10, color: Colors.white, fontWeight: 'bold' }}>
          {Labels.ScheduleView}
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <ScrollView
        // style={styles.scroll}
        // contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={{ margin: '3%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <DatePicker
              style={{ width: 200 }}
              date={date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(d) => {
                getData(moment(d).format('YYYY-MM-DD'));
                setDate(d);
              }}
            />
          </View>
          <View style={{ margin: '2%', marginTop: '2%' }}>
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
                // borderWidth: 1,
                // borderRadius: 8,
                // borderColor: Colors.grey,
                // backgroundColor: '#ecf0f1',
                // width: '100%',
                // justifyContent: 'center',
              }}>
              {/* <Picker
                mode="dropdown"
                iosHeader="Location"
                iosIcon={<Icon name="caret-down" type="FontAwesome" />}
                style={{width: '100%', fontSize: 20}}
                selectedValue={selectedLocation}
                onValueChange={(value) => {
                  getData(moment(date).format('YYYY-MM-DD'), value);
                  setSelectedLocation(value);
                }}>
                {[
                  {locationName: 'Select Location', _id: '0'},
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
              </Picker> */}
              <Select
                title="Select Location"
                label="Location"
                data={locations}
                value={selectedLocation}
                onSelect={(value) => {
                  if (value) {
                    getData(moment(date).format('YYYY-MM-DD'), value);
                    setSelectedLocation(value);
                    setSelectedShift(null);
                  } else {
                    getData();
                    setSelectedLocation(null);
                    setSelectedShift(null);
                  }
                }}
                deletable
                keyOption={"_id"}
                option={"locationName"}
              />
            </View>
          </View>
          <View style={{ margin: '2%', marginTop: '1%' }}>
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
                // borderWidth: 1,
                // borderRadius: 8,
                // borderColor: Colors.grey,
                // backgroundColor: '#ecf0f1',
                // margin: 20,
                // width: '100%',
                // justifyContent: 'center',
              }}>
              {/* <Picker
                mode="dropdown"
                iosHeader="Shift"
                iosIcon={<Icon name="caret-down" type="FontAwesome" />}
                style={{width: '100%', fontSize: 20}}
                selectedValue={selectedShift}
                onValueChange={(value) => {
                  getData(
                    moment(date).format('YYYY-MM-DD'),
                    selectedLocation,
                    value,
                  );
                  setSelectedShift(value);
                  
                }}>
                {[{shiftName: 'Select Shift', _id: '0'}, ...shifts].map(
                  (shift) => {
                    return (
                      <Picker.Item label={shift.shiftName} value={shift._id} />
                    );
                  },
                )}
              </Picker> */}
              <Select
                search={false}
                title="Select Shift"
                label="Shift"
                data={shifts}
                value={selectedShift}
                onSelect={(value) => {
                  if (value) {
                    getData(
                      moment(date).format('YYYY-MM-DD'),
                      selectedLocation,
                      value,
                    );
                    setSelectedShift(value);
                  } else {
                    getData(moment(date).format('YYYY-MM-DD'), selectedLocation);
                    setSelectedLocation(selectedLocation);
                    setSelectedShift(null);
                  }
                }}
                deletable
                keyOption={"_id"}
                option={"shiftName"}
              />
            </View>
          </View>
        </View>
        <View style={{ margin: '0%', marginTop: '0%' }}>
          {/* <AuditTable scheduleType={true} audits={audits} userData={userData}/> */}
          <ScrollView style={styles.mainView}>
            {audits.map((audit, i) => {
              console.log(audit);
              return (
                <Card key={i} style={[styles.cardItem, audit.status === 2 ? styles.ColorCardItem : styles.WhiteCardItem]}>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 5,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Icon
                        type={Icons.entypo}
                        name={Icons.location}
                        style={styles.location}
                      />
                      <Text style={{ color: Colors.green, fontSize: 16 }}>
                        {audit.locationName
                          ? audit.locationName
                          : audit.location.locationName}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginBottom: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                      <Text style={{ fontSize: 15, marginTop: 2, fontWeight: "bold" }}
                      >
                        <Text style={{ fontSize: 20, fontWeight: "bold", textDecorationLine: "underline" }}
                          onPress={() => openDialer(audit.empPhoneNumber)}>
                          {audit?.employeeName || audit?.employee?.name || ''}</Text>
                        <Text>{' '}</Text>
                  ({audit.shiftTime ? (
                          <Text style={{ fontSize: 15, marginTop: 10 }}>
                            {audit.shiftTime}
                          </Text>
                        ) : (
                            audit.shift && (
                              <Text style={{ fontSize: 15, marginTop: 10 }}>

                                {parseShiftTiming(
                                  audit.shift.startTime,
                                  audit.shift.endTime,
                                )}
                              </Text>
                            )
                          )})
                </Text>

                      {audit.remarks && (
                        <Text style={{ fontSize: 15, marginTop: 10 }}>
                          Remarks: {audit.remarks}
                        </Text>
                      )}
                      {(
                        <>
                          <Text
                            style={{
                              fontSize: 15,
                              marginTop: 10,
                            }}>

                            Status:{' '}
                            <Text
                              style={{
                                fontSize: 15,
                                color: StatusColor[audit.status],
                              }}>
                              {' '}
                              {Status[audit.status]}
                            </Text>
                            {(audit.status === 2 && (userData && userData.role === '2')) && (
                              <Button
                                onPress={() => setModalVisible(audit.scheduleId)}
                                style={styles.button}
                                block>
                                <Text
                                  // onPress={() => setModalVisible(schedule._id)}
                                  uppercase={false}
                                  style={{ textAlign: 'center', color: Colors.black }}>
                                  {Labels.applyLeave}
                                </Text>
                              </Button>
                            )}
                          </Text>
                          {(audit.status !== 2) && (
                            <>
                              {(audit.status === 0 || audit.status === 1) && (
                                <>
                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                  <View style={{ flexDirection: "row", alignItems: "center"  }}>
                                    <Text style={{ fontSize: 15 }}>
                                      Clock In: {audit.clockIn}
                                    </Text>
                                  </View>
                                  <View style={{ marginLeft: 10 }} />
                                  <View style={{ flexDirection: "row", alignItems: "center"  }}>
                                    <Text style={{ fontSize: 15 }}>
                                    Clock Out: {audit.clockOut}
                                    </Text>
                                  </View>
                                  {
                                      audit.checkInAddress || audit.checkOutAddress ? (
                                        <TouchableOpacity onPress={() => {
                                          setViewLocation(viewLocation !== i ? i : false); 
                                        }}>
                                          <Icon
                                            type={Icons.entypo}
                                            name={Icons.location}
                                            style={{ fontSize: 25, color: "green", marginLeft: 1 }}
                                          />
                                        </TouchableOpacity>
                                      ) : null
                                    }
                                </View>
                                {
                                  viewLocation === i && (
                                  <>
                                  <View style={{ marginVertical: 10, borderTopWidth: 0.6, borderTopColor: "gainsboro" }}/>
                                    <View>
                                      {
                                        audit.checkInAddress && (
                                          <Text style={{ fontSize: 13 }}>Clock In: {audit.checkInAddress}</Text>
                                        )
                                      }
                                      <View style={{ padding: 5 }} />
                                      {
                                        audit.checkOutAddress && (
                                          <Text style={{ fontSize: 13 }}>Clock Out: {audit.checkOutAddress}</Text>
                                        )
                                      }
                                    </View>
                                  </>
                                  )
                                }
                                </>
                                // <Text style={{ fontSize: 15, marginTop: 10 }}>
                                //   Clock In: {audit.clockIn} {'  '} 
                                //   {audit.status === 1 && (
                                //     <Text style={{ fontSize: 15, marginTop: 10 }}>
                                //       Clock Out: {audit.clockOut}
                                //     </Text>
                                //   )}
                                // </Text>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </View>
                  </View>
                </Card>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.length !== 0}
        onRequestClose={() => {
          setModalVisible('');
          // alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Reason</Text>
            <View
              style={{ position: 'absolute', right: 10, top: 10, padding: 8 }}>
              <Icon
                onPress={() => setModalVisible('')}
                type={'AntDesign'}
                name={'close'}
                style={{ fontSize: 20 }}
              />
            </View>
            <Form>
              <Textarea
                rowSpan={5}
                bordered
                onChangeText={(value) => setReasonText(value)}
              />
            </Form>
            <TouchableHighlight
              style={{ ...styles.openButton }}
              onPress={() => {
                dispatch(
                  scheduleActions.applyLeave({ scheduleId: modalVisible }),
                );
                setModalVisible('');
                navigation.navigate('Reassign');
              }}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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

const styles = StyleSheet.create({
  mainView: { margin: 10 },
  dataTableStyle: { borderColor: '#000', borderWidth: 1, borderRadius: 10 },
  headerStyle: { backgroundColor: '#f7f7f7', borderRadius: 10 },
  ColorCardItem: { backgroundColor: '#ffcccb' },
  WhiteCardItem: { backgroundColor: '#fff' },
  content1: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  content2: {
    alignItems: 'center',
  },
  cardItem: {
    marginBottom: 10,
    width: "98%",
    padding: 1,
    marginTop: 10,
    borderRadius: 10,
  },
  inputStyle: {
    width: '100%',
    borderBottomWidth: 1,
    // borderBottomColor: Colors.green,
    color: Colors.green,
  },
  location: {
    color: Colors.green,
    fontSize: 30,
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
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 15,
    borderColor: Colors.grey,
    backgroundColor: '#EEECF1',

  },
  inputContainer: {
    width: '75%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    marginTop: 20,
    backgroundColor: Colors.green,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
