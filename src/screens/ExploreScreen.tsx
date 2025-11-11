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
  ActivityIndicator,
} from 'react-native';
import { getAnimals } from '../services/AnimalService';
import { useNavigation, useRoute } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import { useTheme } from '../context/ThemeContext';
// @ts-ignore
import * as Animatable from 'react-native-animatable';

const filters = ['All', 'Mammals', 'Birds', 'Reptiles'];

const ExploreScreen = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();

  useEffect(() => {
    if (route.params?.searchQuery) {
      setSearchQuery(route.params.searchQuery);
    }
  }, [route.params?.searchQuery]);

  const fetchAnimals = async (query) => {
    setLoading(true);
    const data = await getAnimals(query);
    setAnimals(data);
    setLoading(false);
  };

  const debouncedFetchAnimals = useCallback(debounce(fetchAnimals, 500), []);

  useEffect(() => {
    let query = searchQuery;
    if (activeFilter !== 'All') {
      query = `${searchQuery} ${activeFilter}`;
    }
    debouncedFetchAnimals(query);
  }, [searchQuery, activeFilter, debouncedFetchAnimals]);

  const renderItem = ({ item, index }) => (
    <Animatable.View animation="zoomIn" duration={500} delay={index * 100}>
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
    </Animatable.View>
  );

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 50 }} />;
    }
    if (animals.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.text }]}>No animals found.</Text>
          <Text style={[styles.emptySubtext, { color: theme.tabInactive }]}>
            Try a different search or filter.
          </Text>
        </View>
      );
    }
    return (
      <FlatList
        data={animals}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        style={styles.gridContainer}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Explore</Text>
      </View>

      <TextInput
        style={[styles.searchBar, { backgroundColor: theme.card, color: theme.text }]}
        placeholder="Search for species..."
        placeholderTextColor={theme.tabInactive}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.chip, { backgroundColor: theme.card }, activeFilter === filter && styles.activeChip]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.chipText, activeFilter === filter ? styles.activeChipText : { color: theme.text }]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    padding: 16,
    maxHeight: 60,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: '#2f7f33',
  },
  chipText: {},
  activeChipText: {
    color: 'white',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptySubtext: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default ExploreScreen;
