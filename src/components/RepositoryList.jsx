import React, { useState, useEffect } from 'react';
import { FlatList, Pressable, View, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  grayLine: {
    backgroundColor: '#D3D3D3',
    height: 10,
  },
  pickerContainer: {
    margin: 10
  },
  searchContainer: {
    margin: 10
  },
  searchInput: {
    height: 40,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5
  },
  placeholder: {
    color: '#D3D3D3'
  }
});

const ItemSeparator = () => <View style={styles.grayLine} />;

const RepositoryListHeader = ({ selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword }) => (
  <>
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for repositories"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
    </View>
    <View style={styles.pickerContainer}>
      <Picker selectedValue={selectedOrder} onValueChange={(value) => setSelectedOrder(value)}>
        <Picker.Item label="Select an item..." value="" enabled={false} style={styles.placeholder} />
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  </>
);

export const RepositoryListContainer = ({ 
  repositories, 
  onEndReach, 
  setSelectedOrder, 
  selectedOrder, 
  searchKeyword, 
  setSearchKeyword 
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <RepositoryListHeader 
          selectedOrder={selectedOrder} 
          setSelectedOrder={setSelectedOrder}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          />}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem key={item.id} repository={item} showGitHubButton={false} />
        </Pressable>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [variables, setVariables] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC'
  });

  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories, fetchMore } = useRepositories({
    first: 4, 
    orderBy: variables.orderBy, 
    orderDirection: variables.orderDirection, 
    searchKeyword: debouncedSearchKeyword
  });

  const onEndReach = () => {
    fetchMore();
  };

  useEffect(() => {
    switch (selectedOrder) {
      case 'highest':
        setVariables({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
        break;
      case 'lowest':
        setVariables({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
        break;
      default:
        setVariables({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
        break;
    }
  }, [selectedOrder]);

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};


export default RepositoryList;
