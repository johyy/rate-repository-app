import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { Link, useNavigate } from "react-router-native";
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row'
  },
});

const AuthTab = ({ isSignedIn, onSignOut }) => {
  if (isSignedIn) {
    return (
      <>
        <Link to="/createreview">
          <AppBarTab text="Create a review" />
        </Link>
        <Link to="/reviews">
          <AppBarTab text="My reviews" />
        </Link>
        <Pressable onPress={onSignOut}>
          <AppBarTab text="Sign out" />
        </Pressable>
      </>
    );
  }
  
  return (
    <>
      <Link to="/signin">
        <AppBarTab text="Sign in" />
      </Link>
      <Link to ="/signup">
        <AppBarTab text="Sign up" />
      </Link>
    </>
  );
};

const AppBar = () => {

  const { data } = useQuery(ME, { fetchPolicy: 'cache-and-network' });
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    signOut();
    navigate('/signin'); 
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab text="Repositories" />
        </Link>
        <AuthTab isSignedIn={data?.me} onSignOut={handleSignOut} />
      </ScrollView>
    </View>
  );
};

export default AppBar;