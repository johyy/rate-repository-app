import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  grayLine: {
    backgroundColor: '#D3D3D3',
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.grayLine} />;

const SingleRepository = () => {
    const { id } = useParams();
    const { data, loading, refetch } = useQuery(GET_REPOSITORY, {
      variables: { id },
      fetchPolicy: 'cache-and-network'
    });

    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    const { repository } = data;
    const reviews = repository.reviews.edges.map((edge) => edge.node);

    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => 
          <ReviewItem 
            review={item} 
            isUserReview={false}
            refetchReviews={refetch} 
          />
        }
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => 
        <RepositoryItem repository={repository} showGitHubButton={true} />}
        ItemSeparatorComponent={ItemSeparator}
    />
    );
  };
  

export default SingleRepository;
