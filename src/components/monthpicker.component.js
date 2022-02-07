import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, Modal, View, Platform } from 'react-native';
import moment from 'moment';
import MonthPicker from 'react-native-month-picker';

export function MonthPickerModal({ date, selectDate, label, ...props }) {
    const [visible, setVisibility] = useState(false);

    return (
        <SafeAreaView>
            <TouchableOpacity style={{ borderWidth: 0.5, borderRadius: 3, borderColor: "#008001", marginRight: 5, justifyContent: "center", padding: 10 }} onPress={() => setVisibility(true)}>
                <Text style={{ color: "#008001" }}>{date ? moment(date).format("MM-YYYY") : null}</Text>
            </TouchableOpacity>
            <Modal {...{ visible }} animationType="fade" onRequestClose={() => setVisibility(false)} transparent>
                <View style={{ flex: 1 }}>
                    <View style={{
                        flex: 1,
                        top: "25%",
                        left: "10%",
                        position: 'absolute',
                        height: "50%",
                        width: "80%",
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'gainsboro',
                        ...Platform.select({
                            ios: {
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22
                            },
                            android: {
                                elevation: 3
                            }
                        })
                    }}>
                        <MonthPicker
                            {...props}
                            // icon not working at the moment...
                            // nextIcon={() => (<Icon type="SimpleLineIcons" name="arrow-left" style={{color: "black", fontSize: 30}} />)}
                            // prevIcon={() => (<Icon type="SimpleLineIcons" name="arrow-left" fontSize={20} />)}
                            maxDate={moment('01-01-3000', 'DD-MMMM-YY')}
                            currentDate={date}
                            selectedDate={date}
                            initialView={date}
                            onMonthChange={(value) => {
                                selectDate(value);
                                setVisibility(false);
                            }}
                        />
                        {
                            label ? (
                                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10}}>
                                    <Text style={{ textAlign: "center" }}>Selecting for <Text style={{ fontWeight: "bold"}}>"{label}"</Text> date.</Text>
                                </View>
                            ) : null
                        }
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}