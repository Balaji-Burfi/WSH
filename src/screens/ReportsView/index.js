/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect,useRef} from 'react';
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
  Modal,Clipboard, Alert
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
  Input,
  Item,
  CheckBox,
  Accordion,
  Left,
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../action-reducer/report/reportActions';
import {Colors, URL, Labels, ScreenName, Icons} from '../../constants/constant';
// import TaskTable from './TaskTable';
import ImagePicker from 'react-native-image-picker';
import * as taskActions from '../../action-reducer/task/taskActions';
import {useFocusEffect} from '@react-navigation/native';
import {
  getShiftsForSupervisorCurrent,
  getLocationsForSupervisorCurrent,
  getEmployeesForshiftAndLocations,
} from '../../action-reducer/employee/employeeActions';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
var questionIndex = 1;
const reportQuestions = {
  1: [
    {
      question: 'Entrance/Exit',
      label: true,
    },
    {
      question: 'Queue Length',
      id: 'q1',
    },
    {
      question: 'No. of People exited since deployment at 6am',
      id: 'q2',
    },
    {
      question: 'All Patrons observed wearing masks?',
      id: 'q3',
      dropdown: true,
      value: [
        {reportName: 'Yes', _id: 'Yes'},
        {reportName: 'No', _id: 'No'},
      ],
    },
    {
      question: 'No. of people rejected due to coming on wrong date \n Elderly',
      id: 'q4',
    },
    {
      question: 'Without Id',
      id: 'q5',
    },
    {
      question: 'Foreigners',
      id: 'q6',
    },
    {
      question: 'Domestic Helpers',
      id: 'q7',
    },
    {
      question: 'No. of frail and elderly admitted to the market',
      id: 'q8',
    },
    {
      question: 'Market',
      label: true,
    },
    {
      question: 'Maximum Patrons allowed in Market',
      id: 'q9',
    },
    {
      question: 'No. of Patrons in Market now',
      id: 'q10',
    },
    {
      question: '% of Elderly Patrons in the Market',
      id: 'q11',
    },
    {
      question: '% of Foreigners Patrons in the Market',
      id: 'q12',
    },
    {
      question: 'All SH observed wearing masks?',
      id: 'q13',
      dropdown: true,
      value: [
        {reportName: 'Yes', _id: 'Yes'},
        {reportName: 'No', _id: 'No'},
      ],
    },
    {
      question: 'SD adherence',
      id: 'q14',
      dropdown: true,
      value: [
        {reportName: 'Low(30-40%)', _id: 'Low(30-40%)'},
        {reportName: 'Medium(50-60%)', _id: 'Medium(50-60%)'},
        {reportName: 'High(80%)', _id: 'High(80%)'},
      ],
    },
    {
      question: 'Is the market orderly?',
      id: 'q15',
      dropdown: true,
      value: [
        {reportName: 'Yes', _id: 'Yes'},
        {reportName: 'No', _id: 'No'},
      ],
    },
    {
      question: 'Fines issues by EO/APO',
      id: 'q16',
    },
  ],
  2: [
    {
      question: 'Queue Length',
      id: 'q1',
    },
  ],
  3:[{
    question:'Title',
    id:'q1',
  },{
    question:'Notes 1',
    id:'q2',

  },{
    question :'Notes 2',
    id:'q3'
  },{question:'Notes 3',
    id:'q4'}
]
};

export default function ReportsView({navigation}) {
  const dispatch = useDispatch();
  console.log
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [profilePreview, setProfilePreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [locations, setLocations] = useState([]);
  const [report, setReport] = useState([]);
  const [viewReport, setViewReport] = useState(false);
  const copyArea = useRef(null);
  const getReports = (iDate, locationId = '0') => {
    const requestBody = {
      forDate: moment(iDate).format('YYYY-MM-DD'),
      locationId,
    };
    questionIndex = 1;
    console.log('s-s-s>>>>>>>>>>>>>>>>>>.requestBody', requestBody);
    dispatch(
      actions.getReport(requestBody, (res) => {
        setReport(res.data);
        console.log(res.data);
        setLocations(
          res.location &&
            res.location.map((r) => {
              return {reportName: r.locationName, _id: r._id};
            }),
        );
        setLoading(false);
      }),
    );
  }; 
  function getValue(r){ 
    var a = ''; 
    var lineNumber = 1; 
    a = a + 'Report:     '+  reportType[r.reportType]  +'\n' + 'SMO:        ' + 
     (r?.employee?.name ||'' )+ '\n' +     'Location:         ' + (r?.nameOfCentre?.locationName || '') + '\n' + 'Created:      '+(r.createdAt? moment(r.createdAt).format("DD/MM/YYYY HH:mm") : '') +'\n'; 
    reportQuestions[r.reportType].map((q, qIndex) => {
      var inc = q.label ? lineNumber : lineNumber++; 
      return q.label ? ( 
          a = a + '\n'+ q.question  
      ) : (
          a= a+'\n'+ + inc+ ')' + q.question 
          +'\n' +(r[q.id]? (r[q.id]?.trim().length > 0
            ? `   ` + r[q.id]?.trim()
            : `   NA`):`   NA`)
      )    })
      Clipboard.setString(a);  
     alert("Copied");
    }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action 
      setSelectedLocation(0);
      setLoading(true);
      setDate(date);
      setLocations([]);
      setReport([]);
      getReports(date);
    });

    return unsubscribe;
  }, []);
 
  const reportType = {
    1: 'Hourly Report (4+3)',
    2: 'Hourly Queue Count Report',
    3: 'Other Report'
  };
  //console.log('s--s>>>>>>>>>>>>>>>Reportss', report);
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
          {Labels.ReportsView}
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <ScrollView
        // style={styles.scroll}
        // contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={{margin: '3%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <DatePicker
              style={{width: 200}}
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
                setDate(d);
                getReports(d, selectedLocation);
              }}
            />
          </View>
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
                iosIcon={<Icon name="caret-down" type="FontAwesome" />}
                style={{width: '100%', fontSize: 20}}
                selectedValue={selectedLocation}
                onValueChange={(value) => {
                  //   setLoading(true);
                  setSelectedLocation(value);
                  getReports(date, value);
                  //   dispatch(
                  //     getShiftsForSupervisorCurrent({locationId: value}, () => {
                  //       setLoading(false);
                  //     }),
                  //   );
                }}>
                {[{reportName: 'Select Location', _id: '0'}, ...locations].map(
                  (location) => {
                    return (
                      <Picker.Item
                        key={location._id}
                        label={location.reportName}
                        value={location._id}
                      />
                    );
                  },
                )}
              </Picker>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}></View>
        {/* <Accordion dataArray={dataArray} expanded={0} /> */}
        
        <View style={{margin: '5%'}}>
          {report.length > 0 &&
            report.map((r, i) => {
              return (
                <Card>
                  <CardItem>
                    <Body>
                      <Text style={{color: 'green', marginBottom: 2}}>
                        {reportType[r.reportType] || ''}
                      </Text>
                      <Text>
                        {`SMO:  `}
                        {r?.employee?.name || ''}
                      </Text>
                      <Text>
                        {`Location: `}
                        {r?.nameOfCentre?.locationName || ''}
                      </Text> 
                      <Text>
                        {`Created: `}
                        {r.createdAt? moment(r.createdAt).format("DD/MM/YYYY HH:mm") : ''}
                      </Text> 
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          flexWrap: 'wrap',
                        }}> 
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          width: '100%',
                        }}>
                        <Button
                          transparent
                          onPress={() => {
                            questionIndex = 1;
                            setViewReport(viewReport !== i ? i : false); 
                          }}>
                          <Text>
                            {viewReport === i ? 'Hide' : 'View'} Report
                          </Text>
                        </Button> 
                      </View>
                    </Body>
                  </CardItem>
                  {viewReport === i && ( <>
                    <View> 
                    <CardItem>
                      <View style={{marginLeft: 5, marginRight: 5}}> 
                        {reportQuestions[r.reportType].map((q, qIndex) => {
                          var inc = q.label ? questionIndex : questionIndex++;
                          return q.label ? (
                            <View
                              style={{
                                borderWidth: 1,
                                borderColor: 'green',
                                marginTop: qIndex === 0 ? 0 : '5%',
                              }}>
                              <Text
                                style={{
                                  marginLeft: 10,
                                  padding: 4,
                                  fontWeight: 'bold',
                                  color: 'green',
                                }}>
                                {q.question}
                              </Text>
                            </View>
                          ) : (
                            <View style={{marginTop: '1%', marginLeft: '4%'}}>
                              <Text style={{fontWeight: '600', fontSize: 16}}>
                                {inc + `)`} {q.question}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 15,
                                  marginTop: 4,
                                  fontWeight: 'bold',
                                }}>
                                {r[q.id]?.trim().length > 0
                                  ? `        ` + r[q.id]?.trim()
                                  : `        NA`}
                              </Text>
                            </View>
                          );
                        })} 
                      </View> 
                     
                    </CardItem>  
                    <View>
                      {r.photo &&
                          r.photo.length > 0 &&
                          r.photo.map((photo, p) => {
                            return (
                              <TouchableOpacity
                                key={p}
                                style={{
                                  marginTop: 10,
                                  marginLeft: '2%',
                                  marginBottom: 5,
                                  width: '100%',
                                  flexDirection: 'row',
                                  flexWrap: 'wrap',
                                }}
                                onPress={() => {
                                  questionIndex=1;
                                  setProfilePreview(photo);}}>
                                <Image
                                  source={{
                                    uri:
                                      URL.BASE_URL +
                                      'api/asserts/images/' +
                                      photo,
                                  }}
                                  style={{width: '25%', height: 80, margin: 10}}
                                />
                              </TouchableOpacity>
                            );
                          })}
                   </View>
                     </View>
                     <View>
                     <Button onPress={()=>getValue(r)}><Text>COPY</Text></Button>
                     </View>
                     </>
                  )}
                </Card>
              );
            })}
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
      {profilePreview && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            questionIndex=1;
            setProfilePreview(false);
          }}>
          <View style={styles.centeredViewPic}>
            <View style={styles.modalViewPic}>
              {/* <View style={{flexDirection: 'row',padding:20}}> */}
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  padding: 10,
                  // bottom: 49,
                }}>
                <Icon
                  onPress={() => { 
                    questionIndex=1;
                    setProfilePreview(false);}}
                  type={'AntDesign'}
                  name={'close'}
                  style={{fontSize: 25, color: '#fff'}}
                />
              </View>
              {/* </View> */}
              <View style={{paddingTop: 30, paddingBottom: 30}}>  
                <Image  
                style={{height:400, width: 300}}
                  source={{
                    uri: URL.BASE_URL + 'api/asserts/images/'+ profilePreview,
                  }} 
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  centeredViewPic: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 0,
  },
  inputStyle: {
    width: '100%',
    borderBottomWidth: 1,
    // borderBottomColor: Colors.green,
    color: Colors.green,
  },
  modalViewPic: {
    margin: 10,
    marginTop: 120,
    marginBottom: 80,
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 30,
    // alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
