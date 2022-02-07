import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../constants/constant";

export function ClockCard({ clock_in, clock_out, border = true }) {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", padding: 2 }}>
            <View style={{ borderColor: "rgba(112, 112, 112, 0.3)", borderWidth: border ? Platform.OS === "android" ? 0.2 : 0.7 : 0,
             flexDirection: "row", borderRadius: border ? 3 : 0, }}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: Colors.success, fontWeight: "bold" }}>IN</Text>
                    <Text style={{ fontWeight: "bold",fontSize:13 }}>{clock_in}</Text>
                </View>
                <View style={{ borderWidth: 0.2, marginHorizontal: 2, marginVertical: 2, borderColor: "gainsboro" }} />
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: Colors.red, fontWeight: "bold" }}>OUT</Text>
                    <Text style={{ fontWeight: "bold" ,fontSize:13 }}>{clock_out}</Text>
                </View>
            </View>
        </View>
    )
}