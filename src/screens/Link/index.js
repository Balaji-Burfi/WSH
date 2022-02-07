import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  ImageBackground,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  View,
  Button,
  Text,
  Icon,
  CardItem,
  Spinner,
  Right,
} from 'native-base';
import Logo from '../../images/logo1.png';
import {Colors, Labels, ScreenName, Icons} from '../../constants/constant';
import {Card} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {getReportUrl} from '../../action-reducer/login/loginActions';

function Link({navigation}) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClick = (link) => {
    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        Linking.openURL(link);
      } else {
        Linking.openURL(link);
        // console.log("Don't know how to open URI: " + link);
      }
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(
      getReportUrl((result) => {
        setLinks(result);
        setLoading(false);
      }),
    );
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      setLoading(true);
      dispatch(
        getReportUrl((result) => {
          setLinks(result);
          setLoading(false);
        }),
      );
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);


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
          {Labels.Link}
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {links.map((link, i) => (
          <Card style={{margin: '3%'}}>
            <CardItem bordered>
              <Text onPress={()=>handleClick(link.link)}>{link.name}</Text>
              <Right>
                <Icon
                  onPress={() => handleClick(link.link)}
                  type={'AntDesign'}
                  style={{color: 'green'}}
                  name="earth"
                />
              </Right>
            </CardItem>
          </Card>
          // <TouchableOpacity
          //   style={{
          //     backgroundColor: 'green',
          //     alignItems: 'center',
          //     justifyContent: 'center',
          //     width: '90%',
          //     marginTop: 20,
          //     borderRadius: 10,
          //   }}
          //   onPress={() => {
          //     handleClick(l);
          //   }}>
          //   <Text style={{textAlign: 'center', margin: 10, color: '#fff'}}>
          //     {l.name}
          //   </Text>
          // </TouchableOpacity>
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
    // justifyContent: 'center',
    // alignItems: 'center',
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
    // borderBottomColor: Colors.green,
    color: Colors.green,
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  content: {
    // flexGrow: 1,
    // justifyContent: 'center',
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

export default Link;
