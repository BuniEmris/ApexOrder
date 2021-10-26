import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import BackBtn from '../../../components/Shared/BackBtn';
import CustomBottomSheet from '../../../components/Shared/CustomBottomSheet';
import PaddWrapper from '../../../components/Shared/PaddWrapper';
import QueryWrapper from '../../../components/Shared/QueryWrapper';
import appStyles from '../../../constants/styles';
import { getResource } from '../../../utils/api';

type Props = {
  route: { params: { id: string } };
};

type AddressType = {
  Address: string;
  ShiftStarts: string;
  ShiftEnds: string;
  Image: string;
  Structure: string;
};

export default function Location({ route }: Props) {
  const { id } = route.params;
  const { data, isError, isLoading } = useQuery<AddressType>(
    ['addresses', id],
    async () => {
      const response = await getResource<AddressType>(
        'pizzerias?UIDStructure=' + id,
      );
      return response?.result;
    },
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.img}
        source={{ uri: 'data:image/png;base64, ' + data?.Image }}>
        <BackBtn />
      </ImageBackground>
      <CustomBottomSheet>
        <QueryWrapper isError={isError} isLoading={isLoading}>
          <PaddWrapper>
            <Text style={styles.name}>{data?.Structure}</Text>
            <Text style={styles.address}>{data?.Address}</Text>
            <Text style={styles.time}>
              с {data?.ShiftStarts} - до {data?.ShiftEnds}
            </Text>
          </PaddWrapper>
        </QueryWrapper>
      </CustomBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  img: {
    position: 'relative',
    width: '100%',
    height: 308,
    backgroundColor: '#ccc',
    marginBottom: -20,
  },
  name: {
    marginTop: 40,
    fontSize: 20,
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR,
  },
  address: {
    marginTop: 15,
    fontSize: 16,
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR_SECONDARY,
  },
  time: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR,
  },
});
