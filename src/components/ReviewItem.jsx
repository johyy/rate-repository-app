import React from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from './Text';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  ratingText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  submitTag: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  deleteTag: {
    flex: 1,
    backgroundColor: '#d73a4a',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  submitText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const ButtonTap = ({ userReview, onViewRepository, onDeleteReview }) => {
  if (userReview) {
    return (
      <View style={styles.buttonContainer}>
        <Pressable onPress={onViewRepository} style={styles.submitTag}>
          <Text style={styles.submitText}>View Repository</Text>
        </Pressable>
        <Pressable onPress={onDeleteReview} style={styles.deleteTag}>
          <Text style={styles.submitText}>Delete Review</Text>
        </Pressable>
      </View>
    );
  }
  return null;
};

const ReviewItem = ({ review, isUserReview, refetchReviews }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleViewRepository = () => {
    navigate(`/repository/${review.repositoryId}`); 
  };

  const handleAlert = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Delete', onPress: () => handleDeleteReview()}
    ]);
  };

  const handleDeleteReview = async () => {
    await deleteReview({ 
      variables: { deleteReviewId: review.id } 
    });
    refetchReviews();

  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.content}>
        {isUserReview ? (
          <Text fontWeight="bold">{review.repository.fullName}</Text>
        ) : (
          <Text fontWeight="bold">{review.user.username}</Text>
        )}
        <Text color="textSecondary">{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text>{review.text}</Text>
        <ButtonTap
          userReview={isUserReview}
          onViewRepository={handleViewRepository}
          onDeleteReview={handleAlert}
        />
      </View>
    </View>
  );
};

export default ReviewItem;
