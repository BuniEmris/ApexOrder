import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheetHandle from '../../../components/Shared/BottomSheetHandle';
import PaddWrapper from '../../../components/Shared/PaddWrapper';
import appStyles from '../../../constants/styles';
import profileBackground from '../../../assets/image/profile-background.png';
import SettingsIcon from '../../../assets/icons/profile/Settings';
import ClockIcon from '../../../assets/icons/profile/Clock';
import ArrowIcon from '../../../assets/icons/Arrow';
import ContactIcon from '../../../assets/icons/tabs/Contacts';
import CustomBottomSheet from '../../../components/Shared/CustomBottomSheet';
import { NavigationType } from '../../../utils/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export default function Owner({ navigation }: { navigation: NavigationType }) {
  const { isSignedIn } = useSelector((state: RootState) => state.auth);

  return (
    <View style={styles.container}>
      {isSignedIn ? (
        <>
          <View style={styles.imgBlock}>
            <TouchableOpacity
              style={styles.settingsBtn}
              onPress={() =>
                navigation.navigate('profile', {
                  screen: 'user-settings',
                })
              }>
              <SettingsIcon />
            </TouchableOpacity>
            <ImageBackground
              source={profileBackground}
              style={styles.imgWrapper}
              resizeMode="stretch">
              <View />
            </ImageBackground>
          </View>

          <CustomBottomSheet handleComponent={<BottomSheetHandle />}>
            <PaddWrapper>
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  navigation.navigate('profile', {
                    screen: 'user-history',
                  })
                }>
                <View style={styles.rowIconWraper}>
                  <ClockIcon />
                </View>
                <Text style={styles.name}>История заказов</Text>
                <ArrowIcon style={styles.arrowRight} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  navigation.navigate('profile', {
                    screen: 'user-addresses',
                  })
                }>
                <View style={styles.rowIconWraper}>
                  <ContactIcon width={15.3} height={18} fill="#1E1B26" />
                </View>
                <Text style={styles.name}>Адреса доставки</Text>
                <ArrowIcon style={styles.arrowRight} />
              </TouchableOpacity>
            </PaddWrapper>
          </CustomBottomSheet>
        </>
      ) : (
        <TouchableOpacity>
          <Text
            style={styles.toAuth}
            onPress={() => navigation.navigate('auth-phone')}>
            Регистрация
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imgBlock: {
    position: 'relative',
    width: '100%',
    height: 330,
    backgroundColor: '#fff',
    marginBottom: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
    shadowColor: 'rgba(30, 27, 38, 0.04)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 1,
  },
  imgWrapper: {
    width: 308,
    height: 142,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  rowIconWraper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(30, 27, 38, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  arrowRight: { marginLeft: 'auto', marginTop: 2 },
  name: {
    fontSize: 16,
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR,
  },
  toAuth: {
    fontSize: 16,
    fontFamily: appStyles.FONT,
    color: appStyles.COLOR_PRIMARY,
  },
});
