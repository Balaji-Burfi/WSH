/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import {Container, View, Button, Text, Icon, Col, Spinner} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../action-reducer/login/loginActions';
import {Colors, Labels, ScreenName, Icons} from '../../constants/constant';
import AuditTable from './AuditTable';
import {getAuditsSupervisor} from '../../action-reducer/employee/employeeActions';

export default function Task({navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const clockStatus = useSelector((state) => state.clock.clockInOutStatuses);
  const [audits, setAudits] = useState([]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setLoading(true);
      dispatch(
        getAuditsSupervisor((data) => {
          setAudits(data);
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
          {Labels.Audit}
        </Text>
      </View>
      <StatusBar backgroundColor={Colors.green} />
      <ScrollView
        // style={styles.scroll}
        // contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainView}>
          <View>
            <Text style={styles.taskListText}>Audit List</Text>
          </View>
          <View>
            <Button
              onPress={() => navigation.navigate(ScreenName.addAudit)}
              style={{
                ...styles.addTaskButton,
              }}
              iconLeft>
              <Icon type={Icons.MaterialIcons} name="add" />
              <Text>ADD AUDIT</Text>
            </Button>
          </View>
        </View>
        <View>
          <AuditTable audits={audits}/>
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
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 25,
  },
  taskListText: {fontSize: 18, fontWeight: '500'},
  addTaskButton: {backgroundColor: Colors.green, height: 40},
});
