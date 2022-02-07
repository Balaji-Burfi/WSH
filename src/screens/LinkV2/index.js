import {
  CardItem, Container, Icon, Picker, Right, Spinner, Text, View, Item
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Linking, ScrollView,
  StatusBar, StyleSheet
} from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Colors, Icons, Labels, URL } from '../../constants/constant';
import apiRequest from '../../services';
import { getReportUrlV2 } from '../../action-reducer/login/loginActions';

function LinkV2({ navigation }) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileList, setMobileList] = useState([])
  const [project, setProject] = useState('')

  const handleClick = (link) => {
    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        Linking.openURL(link);
      } else {
        Linking.openURL(link);
      }
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    async function getMobileLinkList() {
      const mobileListRes = await apiRequest({
        method: "GET",
        url: URL.getMobileReportList
      })

      if (mobileListRes) {
        console.log(mobileListRes.data, 123)
        setMobileList(mobileListRes.data.ProjectList);
        setLoading(false);
      }
    }

    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      setLoading(true);
      getMobileLinkList();


      // dispatch(
      //   getReportUrl((result) => {
      //     setLinks(result);
      //     setLoading(false);
      //   }),
      // );
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(
      getReportUrlV2(project, (result) => {
        setLinks(result);
        setLoading(false);
      }),
    );
  }, [project])



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
          {Labels.Link}
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {
          mobileList && (
            <View
              style={{ margin: '3%' }}
            >
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosHeader="Select Project"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={project}
                  onValueChange={(value) => setProject(value)}
                >
                  {
                    mobileList.map(list => (
                      <Picker.Item label={list.Name} value={list.Id} key={list.Id} />
                    ))
                  }
                </Picker>
              </Item>
            </View>
          )
        }
        {links && links.map((link, i) => (
          <Card style={{ margin: '3%' }}>
            <CardItem bordered>
              <Text onPress={() => handleClick(link.LinkUrl)}>{link.Name}</Text>
              <Right>
                <Icon
                  onPress={() => handleClick(link.LinkUrl)}
                  type={'AntDesign'}
                  style={{ color: 'green' }}
                  name="earth"
                />
              </Right>
            </CardItem>
          </Card>
        ))}
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
  image: {
    height: '100%',
    width: '100%',
  },
  cpLink: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
  inputStyle: {
    width: '100%',
    borderBottomWidth: 1,
    color: Colors.green,
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  content: {
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

export default LinkV2;
