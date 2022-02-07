/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Icon, Picker, Spinner, Text, View, Button, Item } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar, StyleSheet, Linking
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors, Icons, ScreenName, URL } from '../../constants/constant';
import apiRequest from '../../services';

export default function ReportsV2({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [mobileList, setMobileList] = useState([])
  const [templateList, setTemplateList] = useState([])
  const [project, setProject] = useState('')
  const [projectLocation, setProjectLocation] = useState('')
  const [template, setTemplate] = useState('')
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function getMobileLinkList() {
      const mobileListRes = await apiRequest({
        method: "GET",
        url: URL.getMobileReportList
      })

      if (mobileListRes) {
        console.log(mobileListRes.data, 1234)
        setMobileList(mobileListRes.data.ProjectList);
        setTemplateList(mobileListRes.data.TemplateList);
        setUserInfo({
          UrlLink: mobileListRes.data.UrlLink,
          BusinessUnitId: mobileListRes.data.BusinessUnitId,
          EmployeeId: mobileListRes.data.EmployeeId,
          UserId: mobileListRes.data.UserId
        });
        setLoading(false);
      }
    }

    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getMobileLinkList();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(mobileList.filter(i => i.Id === project)[0], null, 5))
    console.log(userInfo)
  }, [project, userInfo])

  useEffect(() => {
    console.log(template, project, projectLocation)
  }, [template, project, projectLocation])

  const handleClick = (link) => {
    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        Linking.openURL(link);
      } else {
        Linking.openURL(link);
      }
    });
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
          {ScreenName.Reports}
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <ScrollView
        // style={styles.scroll}
        // contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View
          style={{ margin: '3%' }}
        >
          {
            templateList && (
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosHeader="Select Template"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={template}
                  onValueChange={(value) => setTemplate(value)}
                >
                  {
                    templateList.map(list => (
                      <Picker.Item label={list.Name} value={list.Id} key={list.Id} />
                    ))
                  }
                </Picker>
              </Item>
            )
          }
          {
            mobileList && (
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosHeader="Select Project"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={project}
                  onValueChange={(value) => {
                    setProject(value);
                    setProjectLocation('');
                  }}
                >
                  {
                    mobileList.map(list => (
                      <Picker.Item label={list.Name} value={list.Id} key={list.Id} />
                    ))
                  }
                </Picker>
              </Item>
            )
          }
          {
            project.length > 0 && mobileList.filter(i => i.Id === project)[0]?.ProjectLocations.length > 0 && (
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosHeader="Select Location"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={projectLocation}
                  onValueChange={(value) => setProjectLocation(value)}
                >
                  {
                    mobileList.filter(i => i.Id === project)[0]?.ProjectLocations?.map(list => (
                      <Picker.Item label={list.Name} value={list.Id} key={list.Id} />
                    ))
                  }
                </Picker>
              </Item>
            )
          }
          <Button
            style={{ marginTop: 20,
              height: 40,
              padding: 5,
              borderRadius: 10,
              backgroundColor: project.length === 0 || template.length === 0 || projectLocation.length === 0 ? Colors.grey : Colors.green
            }}
            onPress={async () => {
              //need to change from constant

              const urlEnv = await AsyncStorage.getItem("runtimeEnv") ?? "PROD";
              const url = `${urlEnv === "PROD" ? URL.BASE_URL_Link8_REPORT : URL.BASE_URL_Link8_DEV_REPORT}/${userInfo.UrlLink}businessUnitId=${userInfo.BusinessUnitId}&userId=${userInfo.UserId}&employeeId=${userInfo.EmployeeId}&projectId=${project}&projectLocationId=${projectLocation}&templateId=${template}`;
              handleClick(url);
              console.log(url);
            }}
            disabled={project.length === 0 || template.length === 0 || projectLocation.length === 0}
          >
            <Text>Open URL</Text>
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
