import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    margin: 10
  },
  centerItem: {
    alignItems: 'center'
  }
});

const RepositoryItemDetails = ({ repository }) => {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.centerItem}>
        <Text fontWeight="bold">{repository.stargazersCount >= 1000 ? `${(repository.stargazersCount / 1000).toFixed(1)}k` : repository.stargazersCount}</Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View style={styles.centerItem}>
        <Text fontWeight="bold">{repository.forksCount >= 1000 ? `${(repository.forksCount / 1000).toFixed(1)}k` : repository.forksCount}</Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View style={styles.centerItem}>
        <Text fontWeight="bold">{repository.reviewCount >= 1000 ? `${(repository.reviewCount / 1000).toFixed(1)}k` : repository.reviewCount}</Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View style={styles.centerItem}>
        <Text fontWeight="bold">{repository.ratingAverage >= 1000 ? `${(repository.ratingAverage / 1000).toFixed(1)}k` : repository.ratingAverage}</Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryItemDetails;