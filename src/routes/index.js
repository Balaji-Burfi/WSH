import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import routeConstants from '../routes/routeConstants';
import CustomDrawer from '../common/CustomDrawer';
import { Dimensions } from 'react-native';
import { useInitialRender } from './useInitialRender';
import { Spinner, View } from 'native-base';
import { useSelector, shallowEqual } from 'react-redux';
const { width } = Dimensions.get('window');

const Drawer = createDrawerNavigator();

// Need to work
// const PrivateRoute = (route, index) => {
//   return localStorage.getItem('token')?  <Stack.Screen key={index} {...route} /> : ;
// };

// const PublicRoute = (route, index) => {
//   return <Stack.Screen key={index} {...route} />;
// };

// const RouteTypes = {
//   Private: PrivateRoute,
//   Public: PublicRoute,
// };

// const RouteElement = route.isAuthenticated
// ? RouteTypes['Private']
// : RouteTypes['Public'];

export default function Route() {
  const initialRouteName =
    routeConstants.initialRouteName || routeConstants.routes.length > 0
      ? routeConstants.routes[0].name
      : false;
  const isInitialRender = useInitialRender();
  const loading = useSelector((state) => state.loading.loading, shallowEqual);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      headerMode={'none'}
      drawerStyle={{ width: isInitialRender ? 0 : width / 1.2 }}
      minSwipeDistance={10}
      initialRouteName={initialRouteName}>
      {routeConstants.routes.map((route, index) => {
        return (
          <Drawer.Screen
            options={{
              gestureEnabled: !route.gestureDisabled,
              swipeEnabled: !route.swipeDisabled,
            }}
            key={`route${index}`}
            index={index}
            {...route}
          />
        );
      })}
    </Drawer.Navigator>
  );
}
