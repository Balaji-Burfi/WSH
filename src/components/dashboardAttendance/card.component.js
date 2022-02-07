import React from 'react';
import { Platform, Text, View } from 'react-native';
import { Colors } from '../../constants/constant';

export function DashboardAttendanceCard({ shiftCode, shiftTime, totalHours, totalHours1 }) {
    if (shiftCode === "0") {
        return (
            <View style={{ borderColor: '#707070', padding: 10, borderWidth: Platform.OS === 'android' ? 0.3 : 0.7, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ flex: 2.5, fontWeight: 'bold', color: 'black', fontSize: 15, textAlign: "left" }} numberOfLines={1}>Shift</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', color: Colors.lightBlack, textAlign: "center" }} numberOfLines={1}>Scheduled</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', color: Colors.lightBlack, textAlign: "right" }} numberOfLines={1}>Actual</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={{ borderRadius: 3, borderColor: '#707070', padding: 10, borderWidth: Platform.OS === 'android' ? 0.1 : 0.7, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ flex: 2.5, fontWeight: 'bold', color: 'black', fontSize: 15, textAlign: "left" }} numberOfLines={1}>{shiftTime}</Text>
                <Text style={{ flex: 1, fontWeight: 'bold', color: Colors.lightBlack, fontSize: 20, textAlign: "center" }} numberOfLines={1}>{totalHours}</Text>
                <Text style={{ flex: 1,  fontWeight: 'bold', color: Colors.lightBlack, fontSize: 20, textAlign: "right", alignSelf: 'stretch' }} numberOfLines={1}>{totalHours1}</Text>
            </View>

        </View>
    )
}