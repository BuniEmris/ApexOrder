import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import BasketIcon from '../../assets/icons/tabs/Basket';
import ContactIcon from '../../assets/icons/tabs/Contacts';
import MainIcon from '../../assets/icons/tabs/Main';
import OrderIcon from '../../assets/icons/tabs/OrderIcon';
import ProfileIcon from '../../assets/icons/tabs/Profile';
import appStyles from '../../constants/styles';
import Basket from './Basket';
import Contacts from './Contacts';
import Home from './Home';
import OrderTab from './OrderTab';
import Profile from './Profile';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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
  const { products } = useSelector((state: RootState) => state.orderSlice);

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
          tabBarIcon: ({ color }) => {
            return (
              <View>
                {products.length > 0 && (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      marginLeft: 20,
                      position: 'absolute',
                      backgroundColor: '#FF7C21',
                      bottom: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ color: 'white', fontWeight: '800' }}>
                      {products.length}
                    </Text>
                  </View>
                )}
                <BasketIcon fill={color} />
              </View>
            );
          },
        }}
        component={Basket}
      />
      <Tab.Screen
        name="OrderTab"
        options={{
          tabBarLabel: 'Заказ',
          tabBarIcon: ({ color }) => <OrderIcon fill={color} />,
        }}
        component={OrderTab}
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
