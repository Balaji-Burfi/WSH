import { Icon } from "native-base";
import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Divider } from "./divider.component";

// Requirement
/**
 * 
 * Data must be an array of Objects [{},{}]
 * Value must be an Object {}
 * keyOption contains the value to select
 * option contains the list of the option
 * 
 */

export function Select({ label, title, data, value, onSelect, keyOption, option, search = true, onDelete, deletable = false }) {
    const [visible, setVisibility] = useState(false);
    const [filter, setFilter] = useState([]);

    const searchData = (text) => {
        data = data.filter((item) => {
            const itemdata = item[option].toUpperCase();
            const textdata = text.toUpperCase();
            return itemdata.indexOf(textdata) > -1
        });
        setFilter(data);
    }

    return (
        <>
            <TouchableOpacity style={[{ backgroundColor: '#f0f2f1', borderRadius: 5, paddingLeft: 20, minHeight: 50, justifyContent: "center" }]} onPress={() => {
                setVisibility(true);
                setFilter(data);
            }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ flex: 1, color: "black", alignSelf: "flex-start", paddingRight: 10 }} numberOfLines={1}>{value ? value[option] : `Select ${label}`}</Text>
                    <Icon
                        type="AntDesign"
                        name="rightcircle"
                        style={{ fontSize: 15, flex: 0.1, alignSelf: "flex-end", marginBottom: 1 }}
                    />
                </View>
            </TouchableOpacity>
            <Modal {...{ visible }} animationType="slide" onRequestClose={() => setVisibility(false)} transparent>
                <View style={{ flex: 1 }}>
                    <View style={{
                        bottom: 0,
                        right: 0,
                        left: 0,
                        position: 'absolute',
                        height: "80%",
                        backgroundColor: 'white',
                        borderTopWidth: 0.5,
                        borderTopColor: 'gainsboro',
                        ...Platform.select({
                            android: {
                                elevation: 10
                            },
                            ios: {
                                // shadow for ios is not implemented at the moment
                            }
                        })
                    }}>
                        <View style={{ margin: 10, marginTop: 0 }}>
                            {/* Top modal 3 columns rows */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                                <View style={{ flex: 1, alignItems: "flex-start" }}>
                                    <TouchableOpacity onPress={() => setVisibility(false)}>
                                        <Icon name={"x"} type="Feather" size={22} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 2, alignItems: "center" }}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: "black" }}>{title ? title : `${label} Selection`}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-end" }}>
                                    {
                                        deletable ? (
                                            <TouchableOpacity onPress={() => onSelect(null)}>
                                                <Icon name={"trash-2"} type="Feather" size={22} />
                                            </TouchableOpacity>
                                        ) : null
                                    }
                                </View>
                            </View>

                            {
                                search ? (
                                    <TextInput
                                        style={[{
                                            backgroundColor: "#f0f2f1", borderRadius: 5, paddingLeft: 20, ...Platform.select({
                                                ios: {
                                                    paddingVertical: 15
                                                }
                                            })
                                        }]}
                                        placeholder={"Search"}
                                        onChangeText={searchData} />
                                ) : null
                            }
                            <KeyboardAvoidingView style={{
                                paddingTop: 5,
                                justifyContent: 'center',
                                height: '100%'
                            }}>
                                <FlatList
                                    data={filter}
                                    // contentContainerStyle={{ paddingTop: 10 }}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => {
                                            onSelect(item);
                                            setVisibility(false);
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginVertical: 10
                                            }}>
                                                <Text style={[{
                                                    fontSize: 15,
                                                    fontWeight: 'bold',
                                                    color: 'darkslategrey'
                                                }, { flex: 1 }]}>{item[option]}</Text>
                                                <Icon
                                                    type="MaterialIcons"
                                                    style={{ paddingTop: 2, fontSize: 20 }}
                                                    name={value && value[option] === item[option] ? "radio-button-checked" : "radio-button-unchecked"} color={"slategray"} />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    ItemSeparatorComponent={() => (
                                        <Divider />
                                    )}
                                    ListEmptyComponent={() => (
                                        <View style={{ flex: 1, marginTop: 50, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ color: "slategray" }}>Nothing to select here...</Text>
                                        </View>
                                    )}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={item => `${item[keyOption]}`
                                    }
                                />
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}