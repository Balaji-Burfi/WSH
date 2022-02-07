import React from "react";
import { View, Text } from "react-native";
import { Icon } from "native-base";
import { Icons, Colors } from "../../constants/constant";
import moment from 'moment';

export function SpringCleaningCard({ item }) {
    return (
        <View style={{ borderRadius: 3, borderColor: "#707070", padding: 10, height: 80, borderWidth: Platform.OS === "android" ? 0.1 : 0.7, justifyContent: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold", color: "black", fontSize: 15 }} numberOfLines={1}>{moment(item.forDate).format('DD-MM-YYYY')}</Text>
                    <Text style={{ fontSize: 13 }}>{item.locationName}</Text>
                </View>
            </View>
        </View>
    )
}