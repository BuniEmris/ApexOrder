import React, { useEffect, useRef } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoder';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import BackBtn from '../components/Shared/BackBtn';
import { setAddress } from '../redux/slices/order-slice';
import { RootState } from '../redux/store';
import Geolocation from 'react-native-geolocation-service';
import AcceptFooter from '../components/Shared/AcceptFooter';
import { NavigationType } from '../utils/types';
Geocoder.fallbackToGoogle('AIzaSyB25GTD2QikXU-TNv9vPIHN4C-A5Ff8ERc');

export default function Map({ navigation }: { navigation: NavigationType }) {
  const mapRef = useRef<MapView>(null);
  const dispatch = useDispatch();
  const { address } = useSelector((state: RootState) => state.orderSlice);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        if (latitude && longitude) getStreetFromLocation(latitude, longitude);
      },
      error => {
        Alert.alert(error.code.toString(), error.message);
      },
      {
        enableHighAccuracy: true,
        forceRequestLocation: true,
        timeout: 10000,
        maximumAge: 10000,
      },
    );
  };

  const getStreetFromLocation = (latitude: number, longitude: number) => {
    Geocoder.geocodePosition({ lat: latitude, lng: longitude })
      .then((res: any) => {
        dispatch(
          setAddress({
            lat: latitude,
            lon: longitude,
            street: res[0]?.streetName,
          }),
        );
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    (async () => {
      let hasPermission = true;
      if (Platform.OS === 'android') {
        hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (!hasPermission) {
          const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          hasPermission = status === PermissionsAndroid.RESULTS.GRANTED;
        }

        if (hasPermission) getCurrentLocation();
      } else {
        getCurrentLocation();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (address) mapRef.current?.fitToElements(true);
  }, [address]);

  return (
    <View style={styles.container}>
      <BackBtn fixed />
      <MapView
        ref={mapRef}
        onPress={e => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          getStreetFromLocation(latitude, longitude);
        }}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: address?.lat || 41.311081,
          longitude: address?.lon || 69.240562,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {address && (
          <Marker
            coordinate={{ latitude: address?.lat, longitude: address?.lon }}
            title={address?.street}
          />
        )}
      </MapView>

      <AcceptFooter
        fixed
        text={address?.street || 'Выберите локацию'}
        onPress={() =>
          navigation.navigate('basket', {
            screen: 'orders',
            params: {
              openingSheet: true,
            },
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
