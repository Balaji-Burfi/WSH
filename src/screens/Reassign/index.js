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
  Modal,
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
  CheckBox,
  List,
  ListItem,
  Spinner,
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../action-reducer/login/loginActions';
import {Colors, Labels, ScreenName, Icons} from '../../constants/constant';
import { Select } from "../../components"
// import TaskTable from './TaskTable';
import ImagePicker from 'react-native-image-picker';
import * as taskActions from '../../action-reducer/task/taskActions';
import {useFocusEffect} from '@react-navigation/native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import moment from 'moment';
import {
  getEmployeesLeaveForSupervisor,
  assignSupervisorItself,
  getUnassignedEmployeeByScheduleId,
  assignBySupervisor,
} from '../../action-reducer/employee/employeeActions';

function Reassign({navigation}) {
  const dispatch = useDispatch();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAssignModel, setShowAssignModal] = useState('');
  const [mySelfChecked, setMySelfChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const employeeLeaves = useSelector((state) => state.employee.employeeLeaves);
  const unAssignedEmployees = useSelector(
    (state) => state.employee.unAssignedEmployees,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setSelectedEmployee(null);
      setMySelfChecked(false);
      setShowAssignModal('');
      setLoading(true);
      dispatch(
        getEmployeesLeaveForSupervisor(() => {
          setLoading(false);
        }),
      );
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   console.log("Here -> ", unAssignedEmployees)
  // }, [unAssignedEmployees])

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
          Reassign
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <ScrollView
        // style={styles.scroll}
        // contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={{margin: '2%', marginTop: '5%'}}>
          {employeeLeaves.length > 0 ? (
            employeeLeaves.map((employeeLeave) => {
              return (
                <Card>
                  <CardItem>
                    <Body>
                      <View
                        style={{
                          flexDirection: 'row',
                          // justifyContent: 'space',
                          alignItems: 'center',
                        }}>
                        <Icon
                          type={Icons.entypo}
                          name={Icons.location}
                          style={styles.location}
                        />
                        <Text style={{color: Colors.green, fontSize: 16}}>
                          {employeeLeave.location.locationName}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft: '12%', margin: 5}}>
                          Shift:
                        </Text>
                        <Text style={{marginLeft: '12%', margin: 5}}>
                          {employeeLeave.shift.shiftName}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft: '12%', margin: 5}}>
                          Employee:
                        </Text>
                        <Text style={{marginLeft: '12%', margin: 5}}>
                          {employeeLeave.employee.name}
                        </Text>
                      </View>
                    </Body>
                    <Right>
                      <Text style={{fontSize: 14, marginRight: 13}}>
                        {moment(employeeLeave.forDate).format(
                          'DD-MM-YYYY',
                        )}
                      </Text>
                      <Button
                        onPress={() => {
                          setShowAssignModal(employeeLeave._id);
                          dispatch(
                            getUnassignedEmployeeByScheduleId({
                              scheduleId: employeeLeave._id,
                            }),
                          );
                        }}
                        style={{
                          backgroundColor: Colors.green,
                          height: 40,
                          padding: 5,
                          borderRadius: 10,
                          marginTop: 10,
                        }}>
                        <Text>ASSIGN</Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              );
            })
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '50%',
              }}>
              <Text style={{fontSize: 20}}>There is no employee to assign</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAssignModel.length > 0}
        onRequestClose={() => {
          setShowAssignModal('');
          if (selectedEmployee && Object.keys(selectedEmployee).length > 0) {
            setSelectedEmployee(null)
          }
          // alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Assign To</Text>
            <View
              style={{position: 'absolute', right: 10, top: 10, padding: 8}}>
              <Icon
                onPress={() => {
                  setShowAssignModal('')
                  if (selectedEmployee && Object.keys(selectedEmployee).length > 0) {
                    setSelectedEmployee(null)
                  }
                }}
                type={'AntDesign'}
                name={'close'}
                style={{fontSize: 20}}
              />
            </View>
            <List>
              <ListItem onPress={() => setMySelfChecked(!mySelfChecked)}>
                <CheckBox
                  onPress={() => setMySelfChecked(!mySelfChecked)}
                  checked={mySelfChecked}
                />
                <Body>
                  <Text>Myself</Text>
                </Body>
              </ListItem>
            </List>
            {!mySelfChecked && (
              <View style={{margin: '2%', marginTop: '5%'}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: Colors.lightBlack,
                    marginBottom: 10,
                  }}>
                  Employee
                </Text>
                <View
                  style={{
                    // borderWidth: 1,
                    // borderRadius: 8,
                    // borderColor: Colors.grey,
                    // backgroundColor: '#ecf0f1',
                    // // margin: 20,
                    // width: '100%',
                    // justifyContent: 'center',
                  }}>
                  {/* <Picker
                    mode="dropdown"
                    iosHeader="Employee"
                    iosIcon={<Icon name="caret-down"  type="FontAwesome"/>}
                    style={{width: '100%', fontSize: 20}}
                    selectedValue={selectedEmployee}
                    onValueChange={(value) => setSelectedEmployee(value)}>
                    {[
                      {name: 'Select Employee', _id: null},
                      ...unAssignedEmployees,
                    ].map((employee) => {
                      return (
                        <Picker.Item
                          label={employee.name}
                          value={employee._id}
                        />
                      );
                    })}
                  </Picker> */}
                  <Select
                    title="Select Employee"
                    label="Employee"
                    data={unAssignedEmployees}
                    value={selectedEmployee}
                    onSelect={(value) => setSelectedEmployee(value)}
                    keyOption="_id"
                    option="name"
                  />
                </View>
              </View>
            )}

            <TouchableOpacity
              style={{...styles.openButton}}
              onPress={() => {
                if (mySelfChecked) {
                  dispatch(
                    assignSupervisorItself({scheduleId: showAssignModel}),
                  );
                } else {
                  dispatch(
                    assignBySupervisor({
                      scheduleId: showAssignModel,
                      employeeId: selectedEmployee,
                    }),
                  );
                }
                setShowAssignModal('');
              }}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
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

export default Reassign;
