import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dispatch, SetStateAction } from 'react';

export type UserStepsType = 'PHONE' | 'CODE' | 'NAME';

export type SettingState<T> = Dispatch<SetStateAction<T>>;

export type ChildrenType = JSX.Element | JSX.Element[] | undefined;

type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: { screen: K; params?: T[K] };
}[keyof T];

type basketNavigation = {
  orders: { openingSheet: boolean };
  order: { UID: string };
};

type contactsNavigation = {
  locations: { choosing: boolean };
  location: { id: string };
};
type profileNavigation = {
  user: undefined;
  'user-history': undefined;
  'user-addresses': undefined;
  'user-settings': undefined;
};

export type NavigationType = CompositeNavigationProp<
  BottomTabNavigationProp<{
    home: undefined;
    basket: SubNavigator<basketNavigation>;
    contacts: SubNavigator<contactsNavigation>;
    profile: SubNavigator<profileNavigation>;
  }>,
  NativeStackNavigationProp<{
    'home-tabs': undefined;
    home: undefined;
    product: { UID: string };
    'auth-phone': undefined;
    'auth-code': undefined;
    'auth-name': undefined;
    map: undefined;
  }>
>;
