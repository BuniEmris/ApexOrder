import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import appStyles from '../../constants/styles';
import { NavigationType } from '../../utils/types';
import { IProductsItem } from '../../utils/types/api';

type Props = {
  product: IProductsItem;
};

export default function FoodItem({ product }: Props) {
  const navigation = useNavigation<NavigationType>();
  console.log(product, 'aaaaa');
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('product', { UID: product.UIDProduct })
      }>
      <Image
        source={{ uri: 'data:image/png;base64, ' + product.Image }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{product.Product}</Text>
        <Text style={styles.body}>{product.Description}</Text>
        <View style={styles.btn}>
          <Text style={styles.btnText}>
            {product?.Price?.toLocaleString()} сум
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: appStyles.HORIZONTAL_PADDING,
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
    marginTop: 30,
    flexDirection: 'row',
  },
  image: {
    width: 140,
    height: 140,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR,
    marginBottom: 11,
  },
  body: {
    fontSize: 12,
    fontFamily: appStyles.FONT_REGULAR,
    color: appStyles.FONT_COLOR_SECONDARY,
    marginBottom: 11,
    lineHeight: 15,
  },
  btn: {
    width: 99,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 124, 33, 0.2)',
    borderRadius: 100,
  },
  btnText: {
    fontFamily: appStyles.FONT,
    color: appStyles.COLOR_PRIMARY,
  },
});
