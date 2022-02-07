import moment from 'moment';
import {
  Container,
  DatePicker, Icon,
  Spinner, Text, View
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import * as dashattendanceAction from '../../action-reducer/dashboardattendance/daAction';
import { DashboardAttendanceCard } from '../../components/dashboardAttendance/card.component';
import { Colors, Icons, Labels } from '../../constants/constant';

const AttendanceDashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [forDate, setForDate] = useState(moment(new Date(), "YYYY-MM-DD"));

  const daDetails = useSelector(
    (state) => state.dashattendance.dashboardAttendanceDetails,
  );

  const dispatch = useDispatch();

  const onSubmit = () => {
    setLoading(true);
    dispatch(
      dashattendanceAction.getDashboardAttendanceDetails(
        {
          forDate: moment(forDate, "YYYY-MM-DD"),
        },
        () => {
          setLoading(false)
        },
        () => {
          setLoading(false);
          setForDate(null);
        },
      ),
    );
  };

  useEffect(() => {
    onSubmit();
   }, []);

  return (
    <Container>
      <View style={styles.header}>
        <Icon
          onPress={() => navigation.openDrawer()}
          type={Icons.entypo}
          name={Icons.menu}
          style={styles.headerIcon}
        />
        <Text style={styles.headerLable}>{Labels.AttendanceDashboard}</Text>
      </View>
      <View style={{ flexDirection: "row", paddingHorizontal: "4%", paddingTop: 10, justifyContent: "space-evenly" }}>
        <View style={{ flex: 1, borderWidth: 0.5, borderRadius: 3, borderColor: "#008001", marginRight: 5 }}>
          <DatePicker
            formatChosenDate={(date) => {
              return moment(date).format('DD-MM-YYYY');
            }}
            locale={'en'}
            timeZoneOffsetInMinutes={480}
            modalTransparent={false}
            animationType={'fade'}
            androidMode={'default'}
            placeHolderText="End date"
            textStyle={{ color: 'green' }}
            placeHolderTextStyle={{ color: 'green' }}
            onDateChange={(d) => {
              setForDate(moment(d).format('YYYY-MM-DD'));
            }}
            placeHolderText={moment(forDate).format('DD-MM-YYYY')}
          />
        </View>
        <TouchableOpacity
          style={{ flex: 1, padding: 10, borderRadius: 3, backgroundColor: Colors.green, justifyContent: "center", alignItems: "center" }}
          onPress={() => onSubmit()}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>FETCH</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, paddingVertical: 10 }}>
        <FlatList
          bounces
          style={{ paddingHorizontal: "4%" }}
          data={daDetails}
          renderItem={({ item }) => {
            const { shiftCode, shiftTime, totalHours, totalHours1 } = item;
            return (
              <DashboardAttendanceCard {...{ shiftCode, shiftTime, totalHours, totalHours1 }} />
            )
          }}
          ItemSeparatorComponent={(index) => <View style={{ paddingVertical: index === 0 || index === 1 ? 0 : 5 }} />}
          keyExtractor={(item) => `${item.shiftCode}`}
        />
      </View>
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
};

const styles = StyleSheet.create({
  loader: {
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
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green,
    height: 60,
  },

  headerIcon: {
    marginLeft: 25,
    color: Colors.white,
  },

  headerLable: {
    marginLeft: 10,
    color: Colors.white,
    fontWeight: 'bold',
  },

  list: {
    marginTop: 10,
  },

  boder: {
    borderColor: Colors.green,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 45,
    width: 110,
  },
});

export default AttendanceDashboard;
