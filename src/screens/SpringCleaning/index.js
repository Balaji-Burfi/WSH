import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Linking, StyleSheet } from 'react-native';
import {
  Container,
  View,
  Text,
  Icon,
  Spinner,
  DatePicker
} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as scAction from '../../action-reducer/springcleaning/scAction';
import { Colors, Labels, Icons } from '../../constants/constant';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MonthPickerModal, SpringCleaningCard } from "../../components";

export default function SpringCleaning({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(moment(new Date()).startOf("month"));
  const [endDate, setEndDate] = useState(moment(new Date()).endOf("month"));

  const springCleaningDetails = useSelector(
    (state) => state.springcleaning.springCleaningDetails,
  );

  const dispatch = useDispatch();

  const onSubmit = () => {
    setLoading(true);

    dispatch(
      scAction.getSpringCleaningDetails(
        {
          startDate: moment(startDate, "DD-MM-YYYY"),
          endDate: moment(endDate, "DD-MM-YYYY"),
          locationId: 0
        },
        () => {
          setLoading(false);
        },
        () => {
          setLoading(false);
          setStartDate(null);
          setEndDate(null);
        },
      ),
    );
  };

  useEffect(() => {
    onSubmit();
  }, [])

  return (
    <Container>
      <View style={styles.header}>
        <Icon
          onPress={() => navigation.openDrawer()}
          type={Icons.entypo}
          name={Icons.menu}
          style={styles.headerIcon}
        />
        <Text style={styles.headerLable}>{Labels.SpringCleaning}</Text>
      </View>
      <View style={{ flexDirection: "row", paddingHorizontal: "4%", paddingTop: 10, justifyContent: "space-evenly" }}>
        <View style={{ flex: 1 }}>
          <MonthPickerModal 
            date={startDate} 
            selectDate={(d) => {
              setStartDate(moment(d));
              setEndDate(moment(d).endOf("month"))
            }}
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
          data={springCleaningDetails}
          ItemSeparatorComponent={() => <View style={{ paddingVertical: 5 }} />}
          renderItem={({ item }) => (
            <SpringCleaningCard {...{ item }} />
          )}
          keyExtractor={(item) => `${item._id}`}
          
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