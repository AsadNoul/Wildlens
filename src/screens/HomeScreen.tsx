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

const HomeScreen = () => {
  const [recentlyIdentified, setRecentlyIdentified] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAnimals = async () => {
      const data = await getAnimals('fox'); // Default search
      setRecentlyIdentified(data);
    };

    fetchAnimals();
  }, []);

  const handleSearch = () => {
    navigation.navigate('Explore', { searchQuery });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Welcome, Alex</Text>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search animals or use camera"
          placeholderTextColor="#5e8760"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      <Text style={styles.sectionTitle}>Recently Identified</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {recentlyIdentified.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.glassCard}
            onPress={() => navigation.navigate('AnimalDetail', { animal: item })}
          >
            <ImageBackground source={{ uri: item.imageUrl }} style={styles.cardImage} imageStyle={{ borderRadius: 12 }}>
            </ImageBackground>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.taxonomy?.scientific_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Quick Access</Text>
      <View style={styles.quickAccessContainer}>
        <TouchableOpacity style={styles.quickAccessItem}>
          <Text style={styles.quickAccessTitle}>Use Camera</Text>
          <Text style={styles.quickAccessSubtitle}>Identify in real-time</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAccessItem}>
          <Text style={styles.quickAccessTitle}>Upload Image</Text>
          <Text style={styles.quickAccessSubtitle}>From your photo library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAccessItem}>
          <Text style={styles.quickAccessTitle}>View Saved Species</Text>
          <Text style={styles.quickAccessSubtitle}>Browse your collection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111811',
    paddingTop: 50,
    paddingBottom: 12,
  },
  searchBarContainer: {
    paddingVertical: 12,
  },
  searchBar: {
    height: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    paddingLeft: 40, // for icon
    fontSize: 16,
    color: '#111811',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111811',
    paddingTop: 20,
    paddingBottom: 12,
  },
  horizontalScroll: {
    paddingBottom: 12,
  },
  glassCard: {
    width: 240,
    marginRight: 16,
    backgroundColor: 'rgba(211, 211, 211, 0.2)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111811',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#5e8760',
  },
  quickAccessContainer: {
    gap: 16,
    paddingBottom: 40,
  },
  quickAccessItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 16,
    borderRadius: 16,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111811',
  },
  quickAccessSubtitle: {
    fontSize: 14,
    color: '#5e8760',
  },
});

export default HomeScreen;
