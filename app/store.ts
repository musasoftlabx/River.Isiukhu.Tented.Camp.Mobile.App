// * React Native
import {Platform} from 'react-native';

// * React Native Libraries
import AsyncStorage from '@react-native-async-storage/async-storage';

// * JS Libraries
import {AxiosInstance} from 'axios';
import dayjs from 'dayjs';
import create from 'zustand';

interface IAuthStore {
  token?: string | null;
  loading?: boolean;
  restore: () => void;
  login: (token: string) => void;
  logout: () => void;
}

interface IConfigStore {
  axios: AxiosInstance | any;
  user: {
    username: string;
    firstName: string;
    lastName: string;
  };
  config: (params: any) => void;
  configUser: (params: any) => void;
}

interface IBottomSheetStore {
  props: any;
  setProps: (params: any) => void;
}

interface IFilterStore {
  from: string;
  to: string;
  setRange: (params: any) => void;
}

export const URL = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://foresee-crm-backend.onrender.com/';
  } else {
    return Platform.OS === 'android'
      ? //? 'http://192.168.100.42:3333/' 'https://foresee-crm-backend.onrender.com/' 'http://10.0.2.2:3333/'
        'http://192.168.100.42:3333/'
      : //'http://10.0.2.2:3333/'
        'http://localhost:3333/';
    //return 'https://foresee-crm-backend.onrender.com/';
  }
};

export const menuURL = `${URL()}public/images/menu/`;
export const photoURL = `${URL()}public/images/photos/`;
export const purchasesURL = `${URL()}public/docs/purchases/`;
export const salesURL = `${URL()}public/docs/sales/`;
export const signaturesURL = `${URL()}public/images/signatures/`;

export const useAuthStore = create<IAuthStore>(set => ({
  token: null,
  loading: true,
  restore: async () => {
    const token = await AsyncStorage.getItem('token');
    set({token, loading: false});
  },
  login: async token => {
    set({token, loading: false});
    await AsyncStorage.setItem('token', token);
  },
  logout: async () => {
    set({token: undefined, loading: false});
    await AsyncStorage.removeItem('token');
  },
}));

export const useConfigStore = create<IConfigStore>(set => ({
  axios: {},
  user: {
    username: '',
    firstName: '',
    lastName: '',
  },
  config: (params: any) => set({axios: params}),
  configUser: (params: any) => set({user: params}),
}));

export const useFilterStore = create<IFilterStore>(set => ({
  from: dayjs().format('YYYY-MM-DD'),
  to: dayjs().format('YYYY-MM-DD'),
  setRange: ({from, to}) => set({from, to}),
}));

export const useBottomSheetStore = create<IBottomSheetStore>(set => ({
  props: {},
  setProps: (params: object) => set({props: params}),
}));
