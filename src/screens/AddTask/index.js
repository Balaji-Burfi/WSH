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
  Textarea,
  Spinner,
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../action-reducer/login/loginActions';
import {Colors, Labels, ScreenName, Icons} from '../../constants/constant';
// import TaskTable from './TaskTable';
import ImagePicker from 'react-native-image-picker';
import * as taskActions from '../../action-reducer/task/taskActions';
import {useFocusEffect} from '@react-navigation/native';

export default function AddTask({navigation}) {
  const dispatch = useDispatch();

  const [selectedTask, setSelectedTask] = useState(null);
  const taskTypes = useSelector((state) => state.task.taskTypes);
  const [photos, setPhotos] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [remarks1, setRemarks1] = useState('');

  const [dataPhotos, setDataPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const clockStatus = useSelector((state) => state.clock.clockInOutStatuses);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setRemarks('');
        setPhotos([]);
        setDataPhotos([]);
        setSelectedTask(null);
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setPhotos([]);
      setRemarks('');
      setDataPhotos([]);
      setLoading(true);
      dispatch(
        taskActions.getAllTaskTypeMaster(() => {
          setLoading(false);
        }),
      );
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);
  useEffect(() => {
    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction,
    // );
  }, []);

  const uploadPhoto = (camera = true) => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
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
    // console.log('Response = ', response);

    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      // console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      // console.log('User tapped custom button: ', response.customButton);
    } else {
      var photo = {
        uri: response.uri,
        type: response.type,
        name: response.fileName,
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

  const onSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append('image', photo);
    });
    formData.append('remarks', remarks);
    formData.append('remarks1', remarks1);
    formData.append('taskType', selectedTask);
    formData.append('scheduleId', clockStatus.sheduleId);

    const onSuccess = () => {
      setLoading(false);
      setRemarks('');
      setPhotos([]);
      setDataPhotos([]);
      setSelectedTask(null);
      navigation.navigate('Task');
    };
    const onError = () => {
      setLoading(false);
    };
    dispatch(taskActions.AddNewTasks(formData, onSuccess, onError));
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
          {Labels.addTask}
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <ScrollView
        // style={styles.scroll}
        // contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={{margin: 20}}>
          <Form>
            <View style={{margin: 10, marginTop: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.lightBlack,
                  marginBottom: 10,
                }}>
                Task
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
                  iosHeader="Task"
                  iosIcon={<Icon name="caret-down" type="FontAwesome" />}
                  style={{width: '100%', fontSize: 20}}
                  selectedValue={selectedTask}
                  onValueChange={(value) => setSelectedTask(value)}>
                  {[{taskType: 'Select Task', _id: null}, ...taskTypes].map(
                    (task) => {
                      return (
                        <Picker.Item label={task.taskType} value={task._id} />
                      );
                    },
                  )}
                </Picker>
              </View>
            </View>

            <View style={{margin: 10, marginTop: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.lightBlack,
                  marginBottom: 10,
                }}>
                Note 1
              </Text>
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
                  onChangeText={(e) => setRemarks(e)}
                  value={remarks}
                  rowSpan={5}
                  bordered
                />
              </View>
            </View>
            <View style={{margin: 10, marginTop: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.lightBlack,
                  marginBottom: 10,
                }}>
                Note 2
              </Text>
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
                  onChangeText={(e) => setRemarks1(e)}
                  value={remarks1}
                  rowSpan={5}
                  bordered
                />
              </View>
            </View>
            <View style={{margin: 10, marginTop: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.lightBlack,
                  marginBottom: 10,
                }}>
                Photo
              </Text>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {dataPhotos.map((photo) => {
                  return (
                    <Image
                      source={photo}
                      style={{width: '25%', height: 80, margin: 10}}
                    />
                  );
                })}
              </View>
              <View
                style={{
                  width: '100%',
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
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Button
                disabled={
                  remarks.length === 0 || !selectedTask || remarks1.length === 0
                }
                onPress={() => onSubmit()}
                style={{
                  backgroundColor:
                    remarks.length === 0 ||
                    !selectedTask ||
                    remarks1.length === 0
                      ? Colors.grey
                      : Colors.green,
                  height: 40,
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Text>SUBMIT</Text>
              </Button>
            </View>
          </Form>
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
