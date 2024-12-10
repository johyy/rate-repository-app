import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  itemWrapper: {
    margin: 10,
    padding: 5
  },
  submitTag: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  submitText: {
    color: 'white',
    fontSize: 14
  },
  textTagGray: {
    padding: 10,
    borderRadius: 5,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    marginBottom: 10
  },
  textTagRed: {
    padding: 10,
    borderRadius: 5,
    borderColor: "#d73a4a",
    borderWidth: 1,
    marginBottom: 10
  },
  grayBackground: {
    backgroundColor: '#D3D3D3',
    flex: 1
  }
});

const initialValues = {
  repoOwner: '',
  repoName: '',
  rating: '',
  review: ''
};

const validationSchema = yup.object().shape({
  repoOwner: yup
    .string()
    .required('Repository owner name is required'),
  repoName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  review: yup
    .string()
});

const CreateReviewInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <View style={styles.itemWrapper}>
        <TextInput
          style={formik.errors.repoOwner && formik.touched.repoOwner ? styles.textTagRed : styles.textTagGray}
          placeholder="Repository owner name"
          placeholderTextColor="#D3D3D3"
          value={formik.values.repoOwner}
          onChangeText={formik.handleChange('repoOwner')}
        />
        {formik.touched.repoOwner && formik.errors.repoOwner && (
          <Text style={{ color: '#D73A4A' }}>{formik.errors.repoOwner}</Text>
        )}
        <TextInput
          style={formik.errors.repoName && formik.touched.repoName ? styles.textTagRed : styles.textTagGray}
          placeholder="Repository name"
          placeholderTextColor="#D3D3D3"
          value={formik.values.repoName}
          onChangeText={formik.handleChange('repoName')}
        />
        {formik.touched.repoName && formik.errors.repoName&& (
          <Text style={{ color: '#D73A4A' }}>{formik.errors.repoName}</Text>
        )}
        <TextInput
          style={formik.errors.rating && formik.touched.rating ? styles.textTagRed : styles.textTagGray}
          placeholder="Rating between 0 and 100"
          placeholderTextColor="#D3D3D3"
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
        />
        {formik.touched.rating && formik.errors.rating&& (
          <Text style={{ color: '#D73A4A' }}>{formik.errors.rating}</Text>
        )}
        <TextInput
          style={formik.errors.review && formik.touched.review ? styles.textTagRed : styles.textTagGray}
          placeholder="Review"
          placeholderTextColor="#D3D3D3"
          value={formik.values.review}
          onChangeText={formik.handleChange('review')}
          multiline
        />
        {formik.touched.review && formik.errors.review&& (
          <Text style={{ color: '#D73A4A' }}>{formik.errors.review}</Text>
        )}
        <Pressable onPress={formik.handleSubmit} style={styles.submitTag}>
          <Text style={styles.submitText}>Create a review</Text>
        </Pressable>
      </View>
      <View style={styles.grayBackground}></View>
    </>
  )
};

const CreateReview = () => {
    const navigate = useNavigate();
    const [createReview] = useMutation(CREATE_REVIEW);
  
    const onSubmit = async (values) => {
        const { repoOwner, repoName, rating, review } = values;
        
        const reviewInput = {
          repositoryName: repoName,
          ownerName: repoOwner,
          rating: parseInt(rating),
          text: review
        };
        
        const { data } = await createReview({
            variables: {
              review: reviewInput
            }
        });
        
        navigate(`/repository/${repoOwner}.${repoName}`); 
      };
      
    return <CreateReviewInForm onSubmit={onSubmit} />;
};

export default CreateReview;