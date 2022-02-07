/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {DataTable} from 'react-native-paper';
import {View, StyleSheet, ScrollView} from 'react-native';

import {Icons} from '../../constants/constant';
import {Icon, Card, CardItem, Right, Left, Text, Body} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, Labels, ScreenName} from '../../constants/constant';
const TaskTable = () => {
  const tasks = useSelector((state) => state.task.tasks);

  return (
    <ScrollView style={styles.mainView}>
      <Card>
        <CardItem
          header
          style={{borderBottomColor: Colors.grey, borderBottomWidth: 1}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              // justifyContent: 'space-around',
            }}>
            <View style={{width: '45%'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Task type</Text>
            </View>
            <View style={{width: '55%'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Remarks</Text>
            </View>
          </View>
          {/* <Left /> */}
        </CardItem>
        {tasks.map((task) => {
          return (
            <CardItem>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  // justifyContent: 'space-around',
                }}>
                <View style={{width: '45%'}}>
                  <Text>{task.taskType?.taskType || ''}</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text>{task.remarks}</Text>
                </View>
              </View>
              {/* <Left /> */}
            </CardItem>
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
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {margin: 20},
  dataTableStyle: {borderColor: '#000', borderWidth: 1, borderRadius: 10},
  headerStyle: {backgroundColor: '#f7f7f7', borderRadius: 10},
});

export default TaskTable;
