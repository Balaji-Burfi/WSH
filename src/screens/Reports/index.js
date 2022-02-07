/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  ImageBackground,
  Image,
  Modal,
  TouchableOpacity,
  BackHandler,
  Linking,
  Alert,Platform
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
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../action-reducer/report/reportActions'; 
import * as taskActions from '../../action-reducer/task/taskActions';
import {Colors, Labels, ScreenName, Icons} from '../../constants/constant';
// import TaskTable from './TaskTable';
import ImagePicker from 'react-native-image-picker';

const reportQuestions = {
  1: {
    title1: 'Entrance/Exit',
    questions1: [
      {
        question: 'Queue Length',
        id: 'q1',
        numeric: true,
      },
      {
        question: 'No. of People exited since deployment at 6am',
        id: 'q2',
        numeric: true,
      },
      {
        question: 'All Patrons observed wearing masks?',
        id: 'q3',
        dropdown: true,
        numeric: false,
        value: [
          {reportName: 'Yes', _id: 'Yes'},
          {reportName: 'No', _id: 'No'},
        ],
      }, 
      {
        question: 'No. of people rejected due to coming on wrong date \n Elderly',
        id: 'q4',
        numeric: true,
      },
      {
        question: 'Without Id',
        id: 'q5',
        numeric: true,
      },
      {
        question: 'Foreigners',
        id: 'q6',
        numeric: true,
      },
      {
        question: 'Domestic Helpers',
        id: 'q7',
        numeric: true,
      },
      {
        question: 'No. of frail and elderly admitted to the market',
        id: 'q8',
        numeric: true,
      },
    ],
    title2: 'Market',
    questions2: [
      {
        question: 'Maximum Patrons allowed in Market',
        id: 'q9',
        numeric: true,
      },
      {
        question: 'No. of Patrons in Market now',
        id: 'q10',
        numeric: true,
      },
      {
        question: '% of Elderly Patrons in the Market',
        id: 'q11',
        numeric: true,
        min:0,
        max:100,
      },
      {
        question: '% of Foreigners Patrons in the Market',
        id: 'q12',
        numeric: true,
        min:0,
        max:100,
      },
      {
        question: 'All SH observed wearing masks?',
        id: 'q13',
        dropdown: true,
        numeric: false,
        value: [
          {reportName: 'Yes', _id: 'Yes'},
          {reportName: 'No', _id: 'No'},
        ],
      },
      {
        question: 'SD adherence',
        id: 'q14',
        numeric: false,
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
        numeric: false,
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
  },
  2: [
    {
      question: 'Queue Length',
      id: 'q1',
      numeric: true,
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

export default function Reports({navigation}) {
  const dispatch = useDispatch();
  
  const [selectedTask, setSelectedTask] = useState(null);
  const taskTypes = useSelector((state) => state.task.taskTypes);

  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [profilePreview, setProfilePreview] = useState(false);
  const [dataPhotos, setDataPhotos] = useState([]);
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({});
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setLoading(true);
      setSelectedReport(null);
      setSelectedCenter(null);
      setPhotos([]);
      setProfilePreview(false);
      setDataPhotos([]);
      setQuestions({});
      setAnswers({});
      setCenters([]);
      dispatch(
        actions.getReportLocations((res) => {
          setLoading(false);
          console.log(res);
          setCenters(
            res.map((r) => {
              return {reportName: r.locationName, _id: r._id};
            }),
          );
        }),
      );
      dispatch(
        taskActions.getAllTaskTypeMaster(() => {
          setLoading(false);
        }),
      );
    });
    return unsubscribe;
  }, []);

  const uploadPhoto = (camera = true) => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.5,
    };

    if (camera) {
      ImagePicker.launchCamera(options, (response) => {
        handleImage(response);
      });
    } else {
      ImagePicker.launchImageLibrary(options, (response) => {
        handleImage(response);
      });
    }
  };

  const handleImage = (response) => {
    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      // console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      // console.log('User tapped custom button: ', response.customButton);
    } else {
      let path = response.uri;
      if (Platform.OS === "ios") {
         path = "~" + path.substring(path.indexOf("/Documents"));
      }
      if (!response.fileName) path = path.split("/").pop();

        var photo = {
          uri: response.uri,
          type: response.type,
          name: path,
        };
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        setPhotos([...photos, photo]);
        setDataPhotos([...dataPhotos, source]);
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    }
  };

  const reports = [
    {
      reportName: 'Hourly Report (4+3)',
      _id: 1,
    },
    {
      reportName: 'Hourly Queue Count Report',
      _id: 2,
    },
    {
      reportName:'Other Report',
      _id:3
    }
  ];

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
          {ScreenName.Reports}
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
              Reports
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
                selectedValue={selectedReport}
                onValueChange={(value) => {
                  //   setLoading(true);
                  setSelectedReport(value);
                  //   dispatch(
                  //     getShiftsForSupervisorCurrent({locationId: value}, () => {
                  //       setLoading(false);
                  //     }),
                  //   );
                }}>
                {reports.length > 0 &&
                  [{reportName: 'Select Report', _id: null}, ...reports].map(
                    (report) => {
                      return (
                        <Picker.Item
                          key={report._id}
                          label={report.reportName}
                          value={report._id}
                        />
                      );
                    },
                  )}
              </Picker>
            </View>
          </View>
          <View style={{margin: '2%', marginTop: '5%'}}>
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
                selectedValue={selectedCenter}
                onValueChange={(value) => {
                  setSelectedCenter(value);
                  //   dispatch(
                  //     getShiftsForSupervisorCurrent({locationId: value}, () => {
                  //       setLoading(false);
                  //     }),
                  //   );
                }}>
                {[{reportName: 'Name of centre', _id: null}, ...centers].map(
                  (center) => {
                    return (
                      <Picker.Item
                        key={center._id}
                        label={center.reportName}
                        value={center._id}
                      />
                    );
                  },
                )}
              </Picker>
            </View>
          </View>
          <View style={{margin: '5%', marginTop: '5%'}}>
            {selectedReport &&
              selectedReport == '2' &&
              reportQuestions[selectedReport].map((question, i) => {
                return (
                  <View key={i} style={{width: '100%', marginBottom: 5}}>
                    <Item
                      stackedLabel
                      style={{width: '80%', borderBottomWidth: 0}}>
                      <Label>{question.question}</Label>
                   
                      <Input
                        style={{
                          borderWidth: 0.5,
                          borderRadius: 10,
                          marginTop: 5,
                        }}
                        disabled={questions[question.id]}
                        value={answers[question.id] || ''}
                        keyboardType={Platform.OS ==="android" ? "numeric" : "number-pad"}
                        onChangeText={(text) =>
                          setAnswers({...answers, [question.id]: text})
                        }
                      /> 
                    </Item>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        position: 'absolute',
                        right: 0,
                        bottom: 13,
                      }}>
                      <CheckBox
                        onPress={() => {
                          setAnswers({...answers, [question.id]: ''});
                          setQuestions({
                            ...questions,
                            [question.id]: questions[question.id]
                              ? false
                              : true,
                          });
                        }}
                        checked={questions[question.id]}
                        color="green"
                      />
                      <Text style={{marginLeft: 20}}>NA</Text>
                    </View>
                  </View>
                );
              })}
              {selectedReport && selectedReport =='3' && 
              reportQuestions[selectedReport].map((question, i) => { 
                return (
                  <View key={i} style={{width: '100%', marginBottom: 5}}>
                    <Item
                      stackedLabel
                      style={{width: '100%', borderBottomWidth: 0}}>
                      <Label>{question.question}</Label>
                      { i == 0 && (  
                         
                         <Picker
                         mode="dropdown"
                         iosHeader="Task"
                         iosIcon={<Icon name="caret-down" type="FontAwesome" />}
                         style={{width: '100%', fontSize: 20 }}
                         selectedValue={selectedTask}
                         onValueChange={(text) =>{
                          setSelectedTask(text); 
                          setAnswers({...answers, [question.id]: text});
                          } } 
                        >
                         {[{taskType: 'Select Task', _id: null}, ...taskTypes].map(
                           (task) => {
                             return (
                               <Picker.Item label={task.taskType} value={task.taskType} />
                             );
                           },
                         )}
                       </Picker>  
                           )} 
                   { i != 0 && ( 
                         <View
                         style={{
                           borderWidth: 1,
                           borderRadius: 8,
                           borderColor: Colors.grey,
                           // margin: 20,
                           width: '100%',
                         }}> 
                         <Textarea
                           style={{borderColor: 'transparent'}}  
                           onChangeText={(text) =>
                             setAnswers({...answers, [question.id]: text})
                           }
                           value={answers[question.id] || ''} 
                           disabled={questions[question.id]}
                           rowSpan={5}
                           bordered
                         />
                       </View> 
                           )} 
                    </Item>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        position: 'absolute',
                        right: 0,
                        bottom:0,
                      }}> 
                    </View>
                  </View>
                );
              })
              }
          </View>
          {selectedReport && selectedReport == '1' && (
            <Card>
              <Text style={{margin: 10, fontWeight: 'bold'}}>
                {reportQuestions[selectedReport].title1}
              </Text>
            </Card>
          )}
          <View style={{margin: '5%', marginTop: '5%'}}>
            {selectedReport &&
              selectedReport == '1' &&
              reportQuestions[selectedReport].questions1.map((question, i) => {
                return (
                  <View key={i} style={{width: '100%', marginBottom: 5}}>
                    <Item
                      stackedLabel
                      style={{width: '80%', borderBottomWidth: 0}}>
                      <Label>{question.question}</Label>
                      {question.dropdown ? (
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
                            iosIcon={
                              <Icon name="caret-down" type="FontAwesome" />
                            }
                            style={{width: '100%', fontSize: 20}}
                            selectedValue={answers[question.id] || ''}
                            onValueChange={(value) => {
                              //   setLoading(true);
                              setAnswers({...answers, [question.id]: value});
                              //   dispatch(
                              //     getShiftsForSupervisorCurrent({locationId: value}, () => {
                              //       setLoading(false);
                              //     }),
                              //   );
                            }}>
                            {[
                              {reportName: 'Select...', _id: null},
                              ...question.value,
                            ].map((report) => {
                              return (
                                <Picker.Item
                                  key={report._id}
                                  label={report.reportName}
                                  value={report._id}
                                />
                              );
                            })}
                          </Picker>
                        </View>
                      ) : ( 
                        <Input
                          style={{
                            borderWidth: 0.5,
                            borderRadius: 10,
                            marginTop: 5,
                          }}
                          disabled={questions[question.id]}
                          value={answers[question.id] || ''}
                          keyboardType={Platform.OS ==="android" ? "numeric" : "number-pad"}
                          onChangeText={(text) =>
                            setAnswers({...answers, [question.id]: text})
                          }
                        /> 
                      )}
                    </Item>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        position: 'absolute',
                        right: 0,
                        bottom: 13,
                      }}>
                      <CheckBox
                        onPress={() => {
                          setAnswers({...answers, [question.id]: ''});
                          setQuestions({
                            ...questions,
                            [question.id]: questions[question.id]
                              ? false
                              : true,
                          });
                        }}
                        checked={questions[question.id]}
                        color="green"
                      />
                      <Text style={{marginLeft: 20}}>NA</Text>
                    </View>
                  </View>
                );
              })}
          </View>
          {selectedReport && selectedReport == '1' && (
            <Card>
              <Text style={{margin: 10, fontWeight: 'bold'}}>
                {reportQuestions[selectedReport].title2}
              </Text>
            </Card>
          )}
          <View style={{margin: '5%', marginTop: '5%'}}>
            {selectedReport &&
              selectedReport == '1' &&
              reportQuestions[selectedReport].questions2.map((question, i) => {
                return (
                  <View key={i} style={{width: '100%', marginBottom: 5}}>
                    <Item
                      stackedLabel
                      style={{width: '80%', borderBottomWidth: 0}}>
                      <Label>{question.question}</Label>
                      {question.dropdown ? (
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
                            iosIcon={
                              <Icon name="caret-down" type="FontAwesome" />
                            }
                            style={{width: '100%', fontSize: 20}}
                            selectedValue={answers[question.id] || ''}
                            onValueChange={(value) => {
                              //   setLoading(true);
                              setAnswers({...answers, [question.id]: value});
                              //   dispatch(
                              //     getShiftsForSupervisorCurrent({locationId: value}, () => {
                              //       setLoading(false);
                              //     }),
                              //   );
                            }}>
                            {[
                              {reportName: 'Select...', _id: null},
                              ...question.value,
                            ].map((report) => {
                              return (
                                <Picker.Item
                                  key={report._id}
                                  label={report.reportName}
                                  value={report._id}
                                />
                              );
                            })}
                          </Picker>
                        </View>
                      ) : (
                        <Input
                          style={{
                            borderWidth: 0.5,
                            borderRadius: 10,
                            marginTop: 5,
                          }}
                          disabled={questions[question.id]}
                          keyboardType={(question.numeric ? (Platform.OS ==="android" ? "numeric" : "number-pad") : "default")}
                          value={answers[question.id] || ''}
                          onChangeText={(text) =>
                            setAnswers({...answers, [question.id]: text})
                          }
                        />
                      )}
                    </Item>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        position: 'absolute',
                        right: 0,
                        bottom: 13,
                      }}>
                      <CheckBox
                        onPress={() => {
                          setAnswers({...answers, [question.id]: ''});
                          setQuestions({
                            ...questions,
                            [question.id]: questions[question.id]
                              ? false
                              : true,
                          });
                        }}
                        checked={questions[question.id]}
                        color="green"
                      />
                      <Text style={{marginLeft: 20}}>NA</Text>
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
        {selectedReport != '2'  && (
          <View style={{margin: '5%', marginTop: 0}}>
            <Text
              style={{
                fontSize: 20,
                color: Colors.lightBlack,
                marginBottom: 10,
              }}>
              Photos
            </Text>
            <View
              style={{flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
              {dataPhotos.length > 0 &&
                dataPhotos.map((photo, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={{
                        marginTop: 10,
                        marginLeft: '2%',
                        marginBottom: 10,
                        width: '29%',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}
                      onPress={() => setProfilePreview(photo)}>
                      <Image
                        source={photo}
                        style={{width: '100%', height: 80, margin: 10}}
                      />
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        )}
        {selectedReport != '2' && (
          <View
            style={{
              margin: '5%',
              marginTop: 0,
              // width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => uploadPhoto()}
              style={{
                borderWidth: 1,
                height: 120,
                width: '45%',
                borderColor: Colors.grey,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <Icon
                type={Icons.antDesign}
                name={'upload'}
                style={{margin: 10}}
              />
              <Text>Take A Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => uploadPhoto(false)}
              style={{
                borderWidth: 1,
                height: 120,
                width: '45%',
                borderColor: Colors.grey,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <Icon
                type={Icons.antDesign}
                name={'camera'}
                style={{margin: 10}}
              />
              <Text>Upload A Picture</Text>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Button
            disabled={!selectedReport}
            onPress={() => {
              setLoading(true);
              const onSuccess = () => {
                setLoading(false);
                alert('Reports saved successfully!');
                navigation.navigate(ScreenName.Dashboard);
              };
              const onError = () => {
                setLoading(false);
                alert('Reports failed to Save');
              };
              const formData = new FormData();
              if(selectedCenter === null){
                setLoading(false);
                alert('Please select center!');
              }else{
              const report = {
                reportType: selectedReport,
                nameOfCentre: selectedCenter,
                answers: answers,
              };  
              formData.append('report', JSON.stringify(report));
              photos.forEach((photo) => {
                console.log(photo);
                formData.append('image', photo);
              });
              console.log(formData);
              dispatch(actions.saveReport(formData, onSuccess, onError));
            }
            }}
            style={{
              backgroundColor: !selectedReport ? Colors.grey : Colors.green,
              height: 40,
              padding: 5,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <Text>SUBMIT</Text>
          </Button>
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
                  onPress={() => setProfilePreview(false)}
                  type={'AntDesign'}
                  name={'close'}
                  style={{fontSize: 25, color: '#fff'}}
                />
              </View>
              {/* </View> */}
              <View style={{paddingTop: 30, paddingBottom: 30}}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    // borderRadius: 50,
                    // backgroundColor: Colors.white,
                    // resizeMode: 'center',
                  }}
                  source={profilePreview}
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
