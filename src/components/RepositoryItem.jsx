import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import RepositoryItemDetails from './RepositoryItemDetails';

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
  },
  grayLine: {
    backgroundColor: '#D3D3D3', 
    height: 10,
  }
});

const RepositoryItem = ({ repository }) => {
  return (
    <>
      <View style={styles.itemWrapper}>
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
        <RepositoryItemDetails repository={repository}/>
      </View>
      <View style={styles.grayLine}/>
    </>
  );
};

export default RepositoryItem;
