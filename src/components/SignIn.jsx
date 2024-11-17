import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
});

const SignInForm = ({ onSubmit }) => {
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
          <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
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
          <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
        )}
        <Pressable onPress={formik.handleSubmit} style={styles.submitTag}>
          <Text style={styles.submitText}>Sign in</Text>
        </Pressable>
      </View>
      <View style={styles.grayBackground}></View>
    </>
  )
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { accessToken } = await signIn({ username, password });
      console.log(accessToken);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };


  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;