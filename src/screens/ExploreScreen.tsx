import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { getAnimals } from '../services/AnimalService';
import { useNavigation } from '@react-navigation/native';

const ExploreScreen = () => {
  const [animals, setAnimals] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAnimals = async () => {
      const data = await getAnimals('lion'); // Default search
      setAnimals(data);
    };

    fetchAnimals();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      <TextInput style={styles.searchBar} placeholder="Search for species..." />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
        <TouchableOpacity style={[styles.chip, styles.activeChip]}>
          <Text style={[styles.chipText, styles.activeChipText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chip}>
          <Text style={[styles.chipText, styles.inactiveChipText]}>Mammals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chip}>
          <Text style={[styles.chipText, styles.inactiveChipText]}>Birds</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.gridContainer}>
        {animals.map((item, index) => (
          <TouchableOpacity
            key={index}
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
        ))}
      </View>
    </ScrollView>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  gridItem: {
    width: '48%',
    aspectRatio: 0.75,
    marginBottom: 16,
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
