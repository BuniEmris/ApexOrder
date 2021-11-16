import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import FoodItem from '../../components/Main/FoodItem';
import Header from '../../components/Main/Header';
import NewsCarousel from '../../components/Main/NewsCarousel';
import Divider from '../../components/Shared/Divider';
import QueryWrapper from '../../components/Shared/QueryWrapper';
import TypePicker from '../../components/Shared/TypePicker';
import { getResource } from '../../utils/api';
import { IGroup, IProductsItem } from '../../utils/types/api';

export default function Home() {
  const [selectedGroup, setSelectedGroup] = useState('');

  const {
    isLoading: groupsLoading,
    isError: groupsIsError,
    data: groups,
  } = useQuery<IGroup[]>('groups', async () => {
    const response = await getResource<IGroup[]>('groups');
    setSelectedGroup(response?.result[0]?.UIDGroup);
    return response.result;
  });

  // ============
  const {
    isLoading: productsLoading,
    isError: productsIsError,
    data: products,
  } = useQuery<IProductsItem[]>(
    ['groups', selectedGroup],
    async () => {
      const response = await getResource<IProductsItem[]>(
        'groups?UIDGroup=' + selectedGroup,
      );
      return response.result;
    },
    { enabled: !!selectedGroup },
  );
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      // onScroll={({ nativeEvent }) => {
      //   const selectedScrollIndex = groups?.findIndex(
      //     el => el.UIDGroup === selectedGroup,
      //   );
      //   if (isCloseToBottom(nativeEvent)) {
      //     if (selectedScrollIndex !== groups?.length - 1) {
      //       setSelectedGroup(groups[selectedScrollIndex + 1]?.UIDGroup);
      //     }
      //   }
      // }}
      scrollEventThrottle={400}
      contentInsetAdjustmentBehavior="automatic"
      stickyHeaderIndices={[2]}>
      <Header />
      <NewsCarousel />
      <>
        <QueryWrapper isLoading={groupsLoading} isError={groupsIsError}>
          <TypePicker
            itemList={groups}
            selected={selectedGroup}
            setSelected={setSelectedGroup}
          />
        </QueryWrapper>
        <Divider />
      </>

      <QueryWrapper
        isLoading={productsLoading}
        IndicatorStyle={{ marginTop: 50 }}
        isError={productsIsError}
        indicatorSize="large">
        {products?.map(product => {
          return <FoodItem key={product.UIDProduct} product={product} />;
        })}
        {/* </ScrollView> */}
      </QueryWrapper>
    </ScrollView>
  );
}
