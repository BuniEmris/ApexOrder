import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  SafeAreaView,
} from 'react-native';
import appStyles from './src/constants/styles';
import HomeTabs from './src/screens/HomeTabs';
import Product from './src/screens/Product';
import FlashMessage from 'react-native-flash-message';
import Map from './src/screens/Map';
import Phone from './src/screens/Auth/Phone';
import Code from './src/screens/Auth/Code';
import Name from './src/screens/Auth/Name';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar
        translucent
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: appStyles.BACKGROUND_DEFAULT },
              }}>
              <Stack.Screen name="home-tabs" component={HomeTabs} />
              <Stack.Screen name="product" component={Product} />
              <Stack.Screen name="map" component={Map} />

              <Stack.Screen name="auth-phone" component={Phone} />
              <Stack.Screen name="auth-code" component={Code} />
              <Stack.Screen name="auth-name" component={Name} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </BottomSheetModalProvider>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
  },
});

export default App;
