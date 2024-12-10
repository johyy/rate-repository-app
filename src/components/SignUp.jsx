import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';


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
  username: '',
  password: '',
  passwordConfirm: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Minimum length of a username is 5 characters')
    .max(30, 'Maximum length of a username is 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Minimum length of a password is 5 characters')
    .max(30, 'Maximum length of a password is 50 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), 'Passwords do not match'])
    .required('Password confirmation is required')
});

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <View style={styles.itemWrapper}>
        <TextInput
          style={formik.errors.username && formik.touched.username ? styles.textTagRed : styles.textTagGray}
          placeholder="Username"
          placeholderTextColor="#D3D3D3"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: '#D73A4A' }}>{formik.errors.username}</Text>
        )}
        <TextInput
          style={formik.errors.password && formik.touched.password ? styles.textTagRed : styles.textTagGray}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#D3D3D3"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        {formik.touched.password && formik.errors.password&& (
          <Text style={{ color: '#D73A4A' }}>{formik.errors.password}</Text>
        )}
        <TextInput
          style={formik.errors.passwordConfirm && formik.touched.passwordConfirm ? styles.textTagRed : styles.textTagGray}
          secureTextEntry
          placeholder="Password confirmation"
          placeholderTextColor="#D3D3D3"
          value={formik.values.passwordConfirm}
          onChangeText={formik.handleChange('passwordConfirm')}
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm&& (
          <Text style={{ color: '#D73A4A' }}>{formik.errors.passwordConfirm}</Text>
        )}
        <Pressable onPress={formik.handleSubmit} style={styles.submitTag}>
          <Text style={styles.submitText}>Sign up</Text>
        </Pressable>
      </View>
      <View style={styles.grayBackground}></View>
    </>
  )
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    const userInput = {
        username: username,
        password: password
    };

    const { data } = await createUser({
        variables: {
            user: userInput
        }
    });

    try {
        const { accessToken } = await signIn({ username, password });
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;