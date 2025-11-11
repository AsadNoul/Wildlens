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
import { useTheme } from '../context/ThemeContext';
// @ts-ignore
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
  const [recentlyIdentified, setRecentlyIdentified] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const { theme } = useTheme();

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
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Welcome, Alex</Text>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={[styles.searchBar, { backgroundColor: theme.card, color: theme.text }]}
          placeholder="Search animals or use camera"
          placeholderTextColor={theme.tabInactive}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Recently Identified</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {recentlyIdentified.map((item, index) => (
          <Animatable.View animation="zoomIn" duration={500} delay={index * 100}>
            <TouchableOpacity
              key={index}
              style={[styles.glassCard, { backgroundColor: theme.card }]}
              onPress={() => navigation.navigate('AnimalDetail', { animal: item })}
            >
              <ImageBackground source={{ uri: item.imageUrl }} style={styles.cardImage} imageStyle={{ borderRadius: 12 }}>
              </ImageBackground>
              <Text style={[styles.cardTitle, { color: theme.text }]}>{item.name}</Text>
              <Text style={[styles.cardSubtitle, { color: theme.tabInactive }]}>{item.taxonomy?.scientific_name}</Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </ScrollView>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Access</Text>
      <View style={styles.quickAccessContainer}>
        <TouchableOpacity
          style={[styles.quickAccessItem, { backgroundColor: theme.card }]}
          onPress={() => navigation.navigate('Identify')}
        >
          <Text style={[styles.quickAccessTitle, { color: theme.text }]}>Use Camera</Text>
          <Text style={[styles.quickAccessSubtitle, { color: theme.tabInactive }]}>Identify in real-time</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickAccessItem, { backgroundColor: theme.card }]}
          onPress={() => navigation.navigate('Identify', { openGallery: true })}
        >
          <Text style={[styles.quickAccessTitle, { color: theme.text }]}>Upload Image</Text>
          <Text style={[styles.quickAccessSubtitle, { color: theme.tabInactive }]}>From your photo library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickAccessItem, { backgroundColor: theme.card }]}
          onPress={() => navigation.navigate('Collection')}
        >
          <Text style={[styles.quickAccessTitle, { color: theme.text }]}>View Saved Species</Text>
          <Text style={[styles.quickAccessSubtitle, { color: theme.tabInactive }]}>Browse your collection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// ... (styles)
