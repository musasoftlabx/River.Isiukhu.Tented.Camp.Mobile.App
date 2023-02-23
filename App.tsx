// * Special instruction
import 'react-native-gesture-handler';

// * React
import {useEffect, useState} from 'react';

// * React Native
import {Alert, LogBox, Platform, StatusBar, useColorScheme} from 'react-native';

// * React Native Libraries
import {SafeAreaProvider} from 'react-native-safe-area-context';

// * React Native Paper
import {Provider, adaptNavigationTheme} from 'react-native-paper';

// * React Navigation
import {
  DefaultTheme as RNLightTheme,
  DarkTheme as RNDarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';
import {
  getBrand,
  getBuildNumber,
  getCarrier,
  getLastUpdateTime,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';

// * JS Libraries
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import axios from 'axios';

// * Navigators
import DrawerNavigator from './app/navigators/DrawerNavigator';

// * Screens
import Login from './app/screens/Auth/Login';
import SplashScreen from './app/screens/SplashScreen';

// * Utilities
import {URL, useAuthStore, useConfigStore} from './app/store';
import {darkTheme, lightTheme} from './app/utils';

// * Subcriptions
const Stack = createStackNavigator();
export const queryClient = new QueryClient();
const {DarkTheme, LightTheme} = adaptNavigationTheme({
  reactNavigationDark: RNDarkTheme,
  reactNavigationLight: RNLightTheme,
});

//* LogBox
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

//* Flipper
//@ts-ignore
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';

let deviceInfo: string = '';
const info = {
  brand: getBrand(),
  build: getBuildNumber(),
  appVersion: getVersion(),
  sysVersion: getSystemVersion(),
};
Geolocation.getCurrentPosition(
  async ({coords: {latitude, longitude}}) => {
    deviceInfo = JSON.stringify({
      ...info,
      carrier: await getCarrier(),
      lastUpdate: new Date(await getLastUpdateTime()),
      coodinates: {latitude, longitude},
    });
  },
  async error => {
    deviceInfo = JSON.stringify({
      ...info,
      carrier: await getCarrier(),
      lastUpdate: new Date(await getLastUpdateTime()).toLocaleString(),
      coodinates: error,
    });
  },
  {maximumAge: 0, enableHighAccuracy: true},
);

export default function App() {
  //const mode = useColorScheme();
  const mode: string = 'light'; //useColorScheme();

  // ? State management
  const token = useAuthStore(state => state.token);
  const loading = useAuthStore(state => state.loading);
  const restore = useAuthStore(state => state.restore);
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);
  const config = useConfigStore(state => state.config);

  useEffect(() => {
    // ? Axios
    const Axios = axios.create({
      baseURL: URL(),
      timeout: 10000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    Axios.interceptors.request.use(
      (req: any) => {
        req.headers.Authorization = `Bearer ${token}`;
        req.headers.DeviceInfo = deviceInfo;
        return req;
      },
      err => Promise.reject(err),
    );

    Axios.interceptors.response.use(
      (res: any) => {
        res.data.__aT && login(res.data.__aT);
        return res;
      },
      err => {
        if (err.code === 'ERR_NETWORK') {
          Alert.alert(
            err.message,
            'We could not establish a connection to the server. Kindly ensure you are connected.',
            [{onPress: () => {}, text: 'OK'}, {text: 'Cancel'}],
          );
        } else {
          err.response.data.forceLogout && logout() /* router.push("/login") */;
        }
        return Promise.reject(err);
      },
    );

    restore();
    config(Axios);
  }, [token]);

  if (loading) return <SplashScreen />;

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        animated
        backgroundColor="transparent"
        //barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        barStyle="light-content"
        translucent
      />
      <Provider theme={mode === 'dark' ? darkTheme : lightTheme}>
        <SafeAreaProvider>
          <NavigationContainer theme={mode === 'dark' ? DarkTheme : LightTheme}>
            {token ? (
              <DrawerNavigator token={token} />
            ) : (
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
      <FlipperAsyncStorage />
    </QueryClientProvider>
  );
}
