import React from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
import Text from './Text';
import RepositoryItemDetails from './RepositoryItemDetails';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  itemWrapper: {
    margin: 10,
    padding: 5
  },
  container: {
    flexDirection: 'row'
  },
  logoContainer: {
    paddingRight: 10
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  textContainer: {
    flex: 1
  },
  languageTag: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  languageText: {
    color: 'white',
    fontSize: 14
  },
  textSpacing: {
    marginBottom: 5
  }
});

const RepositoryItem = ({ repository, showGitHubButton }) => {

  const openGitHub = () => {
    Linking.openURL(repository.url)
  };

  return (
    <>
      <View testID="repositoryItem" style={styles.itemWrapper}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={{
                uri: repository.ownerAvatarUrl,
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text fontWeight="bold" style={styles.textSpacing}>
              {repository.fullName}
            </Text>
            <Text color="textSecondary" style={styles.textSpacing}>{repository.description}</Text>
            <View style={styles.languageTag}>
              <Text style={styles.languageText}>{repository.language}</Text>
            </View>
          </View>
        </View>
        <RepositoryItemDetails repository={repository} />
        {showGitHubButton && (
          <View>
            <Button title="Open in GitHub" onPress={openGitHub} />
          </View>
        )}
      </View>
    </>
  );
};

export default RepositoryItem;
