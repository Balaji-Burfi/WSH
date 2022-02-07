import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabConstants from './TabConstants';
const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{showLabel: false}}
      initialRouteName={TabConstants.initialRouteName}>
      {TabConstants.routes.map((tab) => {
        return (
          <Tab.Screen
            options={{
              //   tabBarLabel: "tab.label",
              tabBarIcon: ({color, size}) => (
                <Image source={tab.icon} color={color} size={size} />
              ),
            }}
            name={tab.name}
            component={tab.component}
          />
        );
      })}
    </Tab.Navigator>
  );
}
