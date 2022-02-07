/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  ImageBackground,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  View,
  Button,
  Text,
  Icon,
  Card,
  Form,
  Textarea,
  Spinner,
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../action-reducer/login/loginActions';
import {Colors, Labels, ScreenName, Icons} from '../../constants/constant';
import * as scheduleActions from '../../action-reducer/schedule/scheduleActions';
import moment from 'moment';
const a = [
  {
    place: 'Guindy',
    timing: '12 AM TO 1 PM',
    date: '30-07-2020',
    shift: 'General Shift',
  },
  {
    place: 'Guindy',
    timing: '12 AM TO 1 PM',
    date: '30-07-2020',
    shift: 'General Shift',
  },
  {
    place: 'Guindy',
    timing: '12 AM TO 1 PM',
    date: '30-07-2020',
    shift: 'General Shift',
  },
  {
    place: 'Guindy',
    timing: '12 AM TO 1 PM',
    date: '30-07-2020',
    shift: 'General Shift',
  },
  {
    place: 'Guindy',
    timing: '12 AM TO 1 PM',
    date: '30-07-2020',
    shift: 'General Shift',
  },
  {
    place: 'Guindy',
    timing: '12 AM TO 1 PM',
    date: '30-07-2020',
    shift: 'General Shift',
  },
  {
    place: 'Guindy',
    timing: '12 AM TO 1 PM',
    date: '30-07-2020',
    shift: 'General Shift',
  },
];

function Schedule({navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const upcomingSchedules = useSelector(
    (state) => state.schedule.upcomingSchedules,
  );
  const [modalVisible, setModalVisible] = useState('');
  const [reasonText, setReasonText] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setLoading(true);
      setReasonText('')
      dispatch(
        scheduleActions.getUpcomingSchedule(() => {
          setLoading(false);
        }),
      );
    }); 
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  function convertTo24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? '0' + h : h; // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? ' AM' : ' PM';
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  }

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
          {Labels.schedule}
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content1}>
          <View style={{...styles.content1, marginTop: 20}}>
            {upcomingSchedules.length > 0 ? (
              upcomingSchedules.map((schedule, i) => (
                <Card key={i} style={schedule.scheduleAssigned ? styles.cardItem : styles.cardItemNoSchedule} >
                  {schedule?.scheduleAssigned != null ? (
                    <View>
                      {schedule.scheduleAssigned == true ? 
                      (
                      <><View
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
                        <Text style={{color: Colors.green, fontSize: 16}}>
                          {schedule.location.locationName}
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
                      <View style={{flexDirection: 'column', marginLeft: 10,overflow:"hidden",maxWidth:"50%"}}>
                        <Text style={{fontSize: 12, marginTop: 2}}>
                          {schedule?.shift?.shiftName || ''}
                        </Text>
                        <Text style={{fontSize: 14, marginRight: 13}}>
                        {moment(schedule.forDate).format('DD-MM-YYYY')}
                      </Text>
                      </View>
                      {!schedule.isLeaveReq ? (
                        <Button
                          onPress={() => setModalVisible(schedule._id)}
                          style={styles.button}
                          block>
                          <Text
                            // onPress={() => setModalVisible(schedule._id)}
                            uppercase={false}
                            style={{textAlign: 'center', color: Colors.black}}>
                            {Labels.applyLeave}
                          </Text>
                        </Button>
                      ) : (
                        <Text
                          // onPress={() => setModalVisible(schedule._id)}
                          uppercase={false}
                          style={{color: Colors.black, marginRight: 13}}>
                          {``}
                        </Text>
                      )}
                    </View>
                 </>
                      )
                      :( 
                      <>
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
                          marginLeft: 10,
                          justifyContent: 'space-around',
                          alignItems: 'center',
                        }}> 
                        <Text style={{color: Colors.green, fontSize: 16}}>
                          No Schedule
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
                    <View style={{flexDirection: 'column', marginLeft: 10,overflow:"hidden",maxWidth:"50%"}}>
                      <Text style={{fontSize: 12, marginTop: 2}}>
                        {schedule?.shift?.shiftName || ''}
                      </Text>
                      <Text style={{fontSize: 14, marginRight: 13}}>
                      {moment(schedule.forDate).format('DD-MM-YYYY')}
                    </Text>
                    </View>  
                  </View>
                      </>
                      )}
                  
               </View>
                  ):( <View><View
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
                      <Text style={{color: Colors.green, fontSize: 16}}>
                        {schedule.location.locationName}
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
                    <View style={{flexDirection: 'column', marginLeft: 10,overflow:"hidden",maxWidth:"50%"}}>
                      <Text style={{fontSize: 12, marginTop: 2}}>
                        {schedule?.shift?.shiftName || ''}
                      </Text>
                      <Text style={{fontSize: 14, marginRight: 13}}>
                      {moment(schedule.forDate).format('DD-MM-YYYY')}
                    </Text>
                    </View>
                    {!schedule.isLeaveReq ? (
                      <Button
                        onPress={() => setModalVisible(schedule._id)}
                        style={styles.button}
                        block>
                        <Text
                          // onPress={() => setModalVisible(schedule._id)}
                          uppercase={false}
                          style={{textAlign: 'center', color: Colors.black}}>
                          {Labels.applyLeave}
                        </Text>
                      </Button>
                    ) : (
                      <Text
                        // onPress={() => setModalVisible(schedule._id)}
                        uppercase={false}
                        style={{color: Colors.black, marginRight: 13}}>
                        {``}
                      </Text>
                    )}
                  </View>
               </View>)
                  }
                 </Card>
              ))
            ) : (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 18,marginLeft: 20, fontWeight: 'bold', marginBottom: 20}}>
                  You don't have any upcoming schedules.
                </Text>
              </View>
            )}
          </View>
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
              style={{position: 'absolute', right: 10, top: 10, padding: 8}}>
              <Icon
                onPress={() => setModalVisible('')}
                type={'AntDesign'}
                name={'close'}
                style={{fontSize: 20}}
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
              style={{...styles.openButton}}
              onPress={() => {
                dispatch(
                  scheduleActions.applyLeave({scheduleId: modalVisible}),
                );
                setModalVisible('');
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
    alignItems: 'center',
  },
  content2: {
    alignItems: 'center',
  },
  cardItem: {
    marginBottom: 20,
    width: '90%',
    marginTop: 10,
    borderRadius: 10,
  },
  cardItemNoSchedule: {
    marginBottom: 20,
    width: '90%',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#ffcccb' 
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

export default Schedule;
