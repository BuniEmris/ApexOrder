import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import ScrollLayoutWithBtn from '../components/Layouts/ScrollLayoutWithBtn';
import MySwitchSelector from '../components/Shared/MySwitchSelector';
import PaddWrapper from '../components/Shared/PaddWrapper';
import PreviewPhoto from '../components/Shared/PreviewPhoto';
import QueryWrapper from '../components/Shared/QueryWrapper';
import TypePicker from '../components/Shared/TypePicker';
import appStyles from '../constants/styles';
import { addToBasket } from '../redux/slices/order-slice';
import { getResource } from '../utils/api';
import { NavigationType } from '../utils/types';
import { IProduct } from '../utils/types/api';

type Props = {
  navigation: NavigationType;
  route: { params: { UID: string } };
};

export default function Product({ route, navigation }: Props) {
  const dispatch = useDispatch();
  const { UID } = route.params;
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSauce, setSelectedSauce] = useState('');
  const [selectedAdditive, setSelectedAdditive] = useState('');
  const [selectedVariantUID, setSelectedVariantUID] = useState('');

  const { isLoading, isError, data } = useQuery<IProduct>(
    ['product', UID],
    async () => {
      const response = await getResource<IProduct>(
        'productinfo?UIDProduct=' + UID,
      );
      return response.result;
    },
    { enabled: !!UID },
  );

  useEffect(() => {
    if (data) {
      if (!data?.isPizza) {
        setSelectedVariantUID(data?.productInfo?.Variants[0]?.UIDNomenclature);
      } else {
        setSelectedSize(data?.productInfo?.Sizes[0] || '');
      }
    }
  }, [data]);

  const variantOptions = useMemo(() => {
    return (
      data?.productInfo?.Variants?.map(el => ({
        label: el.Nomenclature,
        value: el.UIDNomenclature,
      })) || []
    );
  }, [data]);

  const sizeOptions = useMemo(() => {
    const sizeToNumber = (sizeName: string) => {
      switch (sizeName) {
        case 'Маленькая':
          return '25 см';
        case 'Средняя':
          return '30 см';
        case 'Большая':
          return '35 см';
        default:
          return '25 см';
      }
    };

    return (
      data?.productInfo?.Sizes?.map(el => {
        return {
          label: sizeToNumber(el),
          value: el,
        };
      }) || []
    );
  }, [data]);

  const Price = useMemo(() => {
    if (data?.isPizza) {
      const search = data?.productInfo?.Prices?.find(
        el => el.label === `${selectedSize}&%&${selectedAdditive}`,
      );
      return search?.price || 0;
    } else {
      const search = data?.productInfo?.Variants?.find(
        el => el.UIDNomenclature === selectedVariantUID,
      );
      return search?.Price || 0;
    }
  }, [selectedSize, selectedAdditive, data, selectedVariantUID]);

  const handleAdditive = (val: string) => {
    if (val === selectedAdditive) setSelectedAdditive('');
    else setSelectedAdditive(val);
  };

  const addSouse = (val: string) => {
    setSelectedSauce(val);
    // const getSause = data?.productInfo?.Sauces.find(
    //   el => el.UIDNomenclature === val,
    // );
  };

  const addingToBasket = () => {
    dispatch(
      addToBasket({
        Amount: 1,
        Key: data?.isPizza ? `${selectedSize}&%&${selectedAdditive}` : '',
        Price: Price,
        Image: data?.productInfo?.Image,
        UIDProduct: data?.isPizza
          ? data?.productInfo?.UIDProduct
          : selectedVariantUID,
        Product: data?.productInfo?.Product,
      }),
    );
    navigation.goBack();
  };

  return (
    <ScrollLayoutWithBtn
      btnText={`В КОРЗИНУ ЗА ${Price} сум`}
      onBtnPress={addingToBasket}>
      <View>
        <PreviewPhoto base64={data?.productInfo?.Image} />

        <QueryWrapper
          isError={isError}
          isLoading={isLoading}
          indicatorSize="large"
          IndicatorStyle={styles.feedbackMargin}
          errorTextStyle={styles.feedbackMargin}>
          <PaddWrapper>
            <Text style={styles.name}>{data?.productInfo?.Product}</Text>
            <Text style={styles.description}>
              {data?.productInfo?.Description}
            </Text>
          </PaddWrapper>
          {data?.isPizza ? (
            <>
              <PaddWrapper>
                {sizeOptions?.length > 1 && (
                  <MySwitchSelector
                    options={sizeOptions}
                    selectFunc={setSelectedSize}
                    switchStyle={styles.select}
                    value={selectedSize}
                  />
                )}

                <Text style={styles.saucesLabel}>Добавка к пицце</Text>
              </PaddWrapper>
              <TypePicker
                itemList={data?.productInfo?.Additives}
                selected={selectedAdditive}
                setSelected={handleAdditive}
              />
              <PaddWrapper>
                <Text style={styles.saucesLabel}>Соусы</Text>
              </PaddWrapper>
              <TypePicker
                itemList={data?.productInfo?.Sauces}
                selected={selectedSauce}
                setSelected={addSouse}
              />
            </>
          ) : (
            <PaddWrapper>
              {variantOptions?.length > 1 && (
                <MySwitchSelector
                  options={variantOptions}
                  selectFunc={setSelectedVariantUID}
                  switchStyle={styles.select}
                  value={selectedVariantUID}
                  byLabel
                />
              )}
            </PaddWrapper>
          )}
        </QueryWrapper>
      </View>
    </ScrollLayoutWithBtn>
  );
}

const styles = StyleSheet.create({
  feedbackMargin: {
    marginTop: 150,
  },
  name: {
    marginTop: 10,
    fontFamily: appStyles.FONT_BOLDER,
    color: appStyles.FONT_COLOR,
    fontSize: 22,
  },
  description: {
    marginTop: 10,
    fontFamily: appStyles.FONT_REGULAR,
    color: appStyles.FONT_COLOR_SECONDARY,
    fontSize: 16,
    lineHeight: 19,
    width: 217,
  },
  select: { marginTop: 20 },
  saucesLabel: {
    marginTop: 20,
    fontFamily: appStyles.FONT,
    fontSize: 16,
    color: appStyles.FONT_COLOR,
  },
});
