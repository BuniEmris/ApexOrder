import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import BasketIcon from '../../assets/icons/tabs/Basket';
import ContactIcon from '../../assets/icons/tabs/Contacts';
import MainIcon from '../../assets/icons/tabs/Main';
import ProfileIcon from '../../assets/icons/tabs/Profile';
import appStyles from '../../constants/styles';
import Basket from './Basket';
import Contacts from './Contacts';
import Home from './Home';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarActiveTintColor: appStyles.COLOR_PRIMARY,
  tabBarInactiveTintColor: '#C1C1CC',
  tabBarLabelStyle: { fontSize: 12, fontFamily: appStyles.FONT },
  tabBarItemStyle: {
    height: '90%',
  },
  tabBarStyle: {
    height: 65,
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
    shadowColor: 'rgba(30, 27, 38, 0.05)',
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    elevation: 1,
    shadowOpacity: 1.0,
  },
};

export default function HomeTabs() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: appStyles.BACKGROUND_DEFAULT }}
      screenOptions={screenOptions}>
      <Tab.Screen
        name="home"
        options={{
          tabBarLabel: 'Меню',
          tabBarIcon: ({ color }) => <MainIcon fill={color} />,
        }}
        component={Home}
      />
      <Tab.Screen
        name="basket"
        options={{
          tabBarLabel: 'Корзина',
          tabBarIcon: ({ color }) => <BasketIcon fill={color} />,
        }}
        component={Basket}
      />
      <Tab.Screen
        name="contacts"
        options={{
          tabBarLabel: 'Контакты',
          tabBarIcon: ({ color }) => <ContactIcon fill={color} />,
        }}
        component={Contacts}
      />
      <Tab.Screen
        name="profile"
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ color }) => <ProfileIcon fill={color} />,
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
