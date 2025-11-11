import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { getAnimals } from '../services/AnimalService';
import { useNavigation, useRoute } from '@react-navigation/native';
import debounce from 'lodash.debounce';

const filters = ['All', 'Mammals', 'Birds', 'Reptiles'];

const ExploreScreen = () => {
  const [animals, setAnimals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.searchQuery) {
      setSearchQuery(route.params.searchQuery);
    }
  }, [route.params?.searchQuery]);

  const fetchAnimals = async (query) => {
    const data = await getAnimals(query);
    setAnimals(data);
  };

  const debouncedFetchAnimals = useCallback(debounce(fetchAnimals, 500), []);

  useEffect(() => {
    let query = searchQuery;
    if (activeFilter !== 'All') {
      query = `${searchQuery} ${activeFilter}`;
    }
    debouncedFetchAnimals(query);
  }, [searchQuery, activeFilter, debouncedFetchAnimals]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigation.navigate('AnimalDetail', { animal: item })}
    >
      <ImageBackground source={{ uri: item.imageUrl }} style={styles.gridImage} imageStyle={{ borderRadius: 16 }}>
        <View style={styles.gridTextContainer}>
          <Text style={styles.gridTitle}>{item.name}</Text>
          <Text style={styles.gridSubtitle}>{item.locations?.join(', ')}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search for species..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.chip, activeFilter === filter && styles.activeChip]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.chipText, activeFilter === filter ? styles.activeChipText : styles.inactiveChipText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={animals}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        style={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: '#2f7f33',
  },
  chipText: {},
  activeChipText: {
    color: 'white',
  },
  inactiveChipText: {
    color: '#111811',
  },
  gridContainer: {
    paddingHorizontal: 8,
  },
  gridItem: {
    flex: 1,
    margin: 8,
    aspectRatio: 0.75,
  },
  gridImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gridTextContainer: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  gridTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  gridSubtitle: {
    color: 'white',
    fontSize: 12,
  },
});

export default ExploreScreen;
