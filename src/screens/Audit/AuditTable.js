/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {DataTable} from 'react-native-paper';
import {View, StyleSheet, ScrollView, Linking} from 'react-native';

import {Icons} from '../../constants/constant';
import {Icon, Card, CardItem, Right, Left, Text, Body} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, Labels, ScreenName} from '../../constants/constant';
import moment from 'moment';
const Status = {
  0: 'Logged In',
  1: 'Logged Out',
  2: 'Not yet logged in',
};

const StatusColor = {
  0: 'green',
  1: 'red',
  2: '#0000FF',
};
const AuditTable = ({audits, scheduleType,userData}) => {
  function convertTo24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? '0' + h : h; // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? ' AM' : ' PM';
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  }
  const openDialer = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const parseShiftTiming = (startTime, endTime) => {
    const parseTime = (time) =>
      time.includes('.')
        ? time.split('.')[0].length === 1
          ? `0${time}`
          : time
        : time.length === 1
        ? `0${time}`
        : `${time}`;
    startTime = convertTo24(parseTime(startTime));
    endTime = convertTo24(parseTime(endTime));
    return `${startTime} To ${endTime}`;
  };

  return (
    <ScrollView style={styles.mainView}>
      {audits.map((audit, i) => {
        return (
          <Card key={i} style={[styles.cardItem,audit.status ===2 ? styles.ColorCardItem :styles.WhiteCardItem]}>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 5,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Icon
                  type={Icons.entypo}
                  name={Icons.location}
                  style={styles.location}
                />
                <Text style={{color: Colors.green, fontSize: 16}}>
                  {audit.locationName
                    ? audit.locationName
                    : audit.location.locationName}
                </Text>
              </View>
{/* 
              <Text style={{fontSize: 14, marginRight: 13}}>
                {moment.utc(audit.forDate).format('DD-MM-YYYY')}
              </Text> */}
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Text style={{fontSize: 15, marginTop: 2,fontWeight:"bold"}}
               >
                   <Text style={{fontSize: 20, fontWeight:"bold",textDecorationLine:"underline"}}  
                   onPress={() => openDialer(audit.empPhoneNumber)}>
                 {audit?.employeeName || audit?.employee?.name || ''}</Text>
            <Text>{' '}</Text>
                  ({audit.shiftTime ?   (
                  <Text style={{fontSize: 15, marginTop: 10}}>
                    {audit.shiftTime}
                  </Text> 
                ) : (
                  audit.shift && (
                    <Text style={{fontSize: 15, marginTop: 10}}> 
                     
                      {parseShiftTiming(
                        audit.shift.startTime,
                        audit.shift.endTime,
                      )} 
                    </Text> 
                  )
                )}) 
                </Text>
                
                {audit.remarks && (
                  <Text style={{fontSize: 15, marginTop: 10}}>
                    Remarks: {audit.remarks}
                  </Text>
                )}
                {scheduleType && (
                  <> 
                    <Text
                      style={{
                        fontSize: 15,
                        marginTop: 10,
                      }}>
                        
                      Status:{' '}
                      <Text
                        style={{
                          fontSize: 15,
                          color: StatusColor[audit.status],
                        }}>
                        {' '}
                        {Status[audit.status]} 
                      </Text> 
                    </Text>   
                    {(audit.status !== 2 && userData.role === '2') && (
                      <>
                        {(audit.status === 0 || audit.status === 1) && (
                          <Text style={{fontSize: 15, marginTop: 10}}>
                            Clock In: {audit.clockIn} {'  '}
                            {audit.status === 1 && (
                          <Text style={{fontSize: 15, marginTop: 10}}>
                            Clock Out: {audit.clockOut}
                          </Text>
                        )}
                          </Text>
                        )}
                       
                      </>
                    )}
                    {/* <Text style={{fontSize: 15, marginTop: 10}}>
                      Employee Phone:{' '}
                      <Text
                        onPress={() => openDialer(audit.empPhoneNumber)}
                        style={{
                          color: 'blue',
                          textDecorationLine: 'underline',
                        }}>
                        {audit.empPhoneNumber}
                      </Text>
                    </Text> */}
                    {/* <Text
                      style={{
                        fontSize: 15,
                        marginTop: 10,
                      }}>
                      Supervisor Phone:{' '}
                      <Text
                        onPress={() => openDialer(audit.supPhoneNumber)}
                        style={{
                          color: 'blue',
                          textDecorationLine: 'underline',
                        }}>
                        {audit.supPhoneNumber}
                      </Text>
                    </Text> */}
                  </>
                )}
              
              </View>
            </View>
           
                 
                   </Card>
        );
      })}
      {/* <DataTable style={styles.dataTableStyle}>
        <DataTable.Header style={styles.headerStyle}>
          {Headers.map((header, i) => {
            return (
              <DataTable.Title key={`header-${i}`}>
                {header.name}
              </DataTable.Title>
            );
          })}
        </DataTable.Header>

        {columns.map((col) => {
          return (
            <DataTable.Row>
              {col.rows.map((row, i) => {
                return (
                  <DataTable.Cell  key={`cell-${i}`}>
                    {renderCellItem(row)}
                  </DataTable.Cell>
                );
              })}
            </DataTable.Row>
          );
        })}
      </DataTable> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {margin: 20},
  dataTableStyle: {borderColor: '#000', borderWidth: 1, borderRadius: 10},
  headerStyle: {backgroundColor: '#f7f7f7', borderRadius: 10},
  ColorCardItem:{backgroundColor: '#ffcccb'},
  WhiteCardItem:{backgroundColor: '#fff'},
});

AuditTable.defaultProps = {
  scheduleType: false,
};
export default AuditTable;
