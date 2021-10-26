import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Linking,
} from 'react-native';
import appStyles from '../../../constants/styles';
import LinearGradient from 'react-native-linear-gradient';
import TwitterIcon from '../../../assets/icons/location/Twitter';
import InstagramIcon from '../../../assets/icons/location/Instagram';
import FacebookIcon from '../../../assets/icons/location/Facebook';
import ContactIcon from '../../../assets/icons/tabs/Contacts';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import BottomSheetHandle from '../../../components/Shared/BottomSheetHandle';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import mapMarker from '../../../assets/icons/location/map-marker.png';
import { useQuery } from 'react-query';
import { getResource } from '../../../utils/api';
import QueryWrapper from '../../../components/Shared/QueryWrapper';
import { showMessage } from 'react-native-flash-message';
import { useRef } from 'react';
import { NavigationType } from '../../../utils/types';
import { useDispatch } from 'react-redux';
import {
  ILocations,
  setSelectedStructure,
} from '../../../redux/slices/order-slice';

type Props = {
  navigation: NavigationType;
  route: { params: { choosing: boolean } };
};

export default function Locations({ navigation, route }: Props) {
  const dispatch = useDispatch();
  const mapRef = useRef<MapView>(null);
  const { choosing } = route.params;

  const { data, isError, isLoading } = useQuery<ILocations[]>(
    'addresses',
    async () => {
      const response = await getResource<ILocations[]>('pizzerias');
      return response?.result;
    },
  );

  const snapPoints = useMemo(() => ['35%', '70%'], []);

  const handleLink = useCallback(async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      showMessage({
        message: `Don't know how to open this URL: ${url}`,
        type: 'warning',
      });
    }
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ILocations }) => (
      <TouchableOpacity
        style={styles.imageWrapper}
        onPress={() => {
          if (choosing) {
            dispatch(setSelectedStructure(item));
            navigation.navigate('basket', {
              screen: 'orders',
              params: {
                openingSheet: true,
              },
            });
          } else {
            navigation.navigate('contacts', {
              screen: 'location',
              params: {
                id: item.UIDStructure,
              },
            });
          }
        }}>
        <ImageBackground
          style={styles.image}
          source={{ uri: 'data:image/png;base64, ' + item?.Image }}>
          <LinearGradient
            colors={['rgba(19, 19, 19, 0)', '#131313']}
            style={styles.gradientBlock}>
            <View style={styles.imgTextWrapper}>
              <ContactIcon fill="#FFFFFF" />
              <Text style={styles.imgText}>{item.Address}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (data?.length) mapRef.current?.fitToElements(true);
  }, [data]);
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 41.311081,
          longitude: 69.240562,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {data?.map((el, i) => (
          <Marker
            key={i}
            coordinate={{ latitude: el?.Lat, longitude: el?.Lon }}
            image={mapMarker}
            title={el?.Structure}
          />
        ))}
      </MapView>
      <BottomSheet
        handleComponent={BottomSheetHandle}
        index={0}
        snapPoints={snapPoints}>
        <BottomSheetFlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <QueryWrapper isError={isError} isLoading={isLoading}>
              <View style={styles.socialIcons}>
                <TwitterIcon
                  onPress={() =>
                    handleLink('https://www.instagram.com/apexpizza.uz/?hl=en')
                  }
                />
                <InstagramIcon
                  style={styles.iconSpacing}
                  onPress={() =>
                    handleLink('https://www.instagram.com/apexpizza.uz/?hl=en')
                  }
                />
                <FacebookIcon
                  onPress={() =>
                    handleLink('https://www.instagram.com/apexpizza.uz/?hl=en')
                  }
                />
              </View>
            </QueryWrapper>
          )}
          data={data}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
          style={styles.sheetContainer}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ccc' },
  map: { flex: 1 },
  sheetContainer: {
    flex: 1,
    paddingHorizontal: appStyles.HORIZONTAL_PADDING,
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
  },
  contentContainer: {
    width: '100%',
    paddingBottom: 120,
  },
  socialIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  iconSpacing: {
    marginHorizontal: 20,
  },
  imageWrapper: {
    width: '100%',
    height: 160,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  gradientBlock: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  imgTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  imgText: {
    marginLeft: 20,
    color: '#FFFFFF',
    fontFamily: appStyles.FONT,
    fontSize: 14,
    width: 175,
  },
});
