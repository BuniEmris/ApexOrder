import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocalData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    throw Error('saving error');
  }
};

export const getLocalData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? value : null;
  } catch (e) {
    throw Error('error reading value');
  }
};

export const removeLocalData = (key: string) => {
  AsyncStorage.removeItem(key);
};
