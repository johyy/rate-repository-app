import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import Text from './Text';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
    grayLine: {
      backgroundColor: '#D3D3D3',
      height: 10,
    }
  });
  
  const ItemSeparator = () => <View style={styles.grayLine} />;
  
  const Reviews = () => {
    const { data, loading, refetch } = useQuery(ME, {
      variables: { includeReviews: true },
      fetchPolicy: 'cache-and-network',
    });

    if (loading) {
        return <Text>Loading...</Text>;
    }

    const user = data?.me;
    const reviews = user?.reviews?.edges?.map(edge => edge.node) || [];
  
    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => 
          <ReviewItem 
            review={item} 
            isUserReview={true}
            refetchReviews={refetch} 
          />
        }
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  };
  

export default Reviews;
