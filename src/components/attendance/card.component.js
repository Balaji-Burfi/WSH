import React from "react";
import { View, Text, Platform } from "react-native";
import { Icon } from "native-base";
import { Icons, Colors } from "../../constants/constant";
import moment from 'moment';
import { ClockCard } from "./clock.component"
export function AttendanceCard({ item }) {
    return (
        <View style={{ borderRadius: 3, borderColor: "#707070", padding: 10, borderWidth: Platform.OS === "android" ? 0.1 : 0.7, justifyContent: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold", color: "black", fontSize: 15 }} numberOfLines={1}>{moment(item.createdAt).format('DD-MM-YYYY')}</Text>
                    <Text style={{ fontSize: 13 }}  numberOfLines={1}>{item.shift?.shiftName.replace("&", "& ")}</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                    {/* Clock in Clock Out component */}
                    <ClockCard clock_in={`${item.checkInTime}`} clock_out={`${item.checkOutTime ? item.checkOutTime : ""}`} border />
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                {/* Location name */}
                <Icon
                    type={Icons.entypo}
                    name={Icons.map}
                    style={{ marginLeft: 2, marginRight: 5, color: Colors.lightBlack, fontSize: 16 }}
                />
                <Text style={{ fontWeight: "bold", color: Colors.lightBlack }} numberOfLines={1}>{item.location?.locationName ? item.location?.locationName : "No Location"}</Text>
            </View>
        </View>
    )
}