import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';

const AnimalDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { animal } = route.params;
  const { theme } = useTheme();

  const saveToCollection = async () => {
    try {
      const existingCollection = await AsyncStorage.getItem('collection');
      const collection = existingCollection ? JSON.parse(existingCollection) : [];

      if (!collection.find(item => item.name === animal.name)) {
        collection.push(animal);
        await AsyncStorage.setItem('collection', JSON.stringify(collection));
        Alert.alert('Success', `${animal.name} has been added to your collection.`);
      } else {
        Alert.alert('Info', `${animal.name} is already in your collection.`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save animal to collection.');
    }
  };

  const handleViewOnMap = () => {
    const location = animal.locations?.[0];
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        <ImageBackground
          source={{ uri: animal.imageUrl }}
          style={styles.headerImage}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: theme.text }]}>{animal.name}</Text>
          <Text style={[styles.subtitle, { color: theme.tabInactive }]}>{animal.taxonomy?.scientific_name}</Text>
          <View style={[styles.chip, { backgroundColor: theme.chip }]}>
            <Text style={[styles.chipText, { color: theme.chipText }]}>{animal.characteristics?.prey}</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <Text style={[styles.tab, styles.activeTab, { color: theme.tabActive, borderBottomColor: theme.primary }]}>Overview</Text>
          <Text style={[styles.tab, { color: theme.tabInactive }]}>Habitat</Text>
          <Text style={[styles.tab, { color: theme.tabInactive }]}>Gallery</Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.glassyCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Quick Facts</Text>
            <Text style={[styles.cardText, { color: theme.text }]}>
              Locations: {animal.locations?.join(', ')}
            </Text>
          </View>
          <View style={[styles.glassyCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Characteristics</Text>
            <Text style={[styles.cardText, { color: theme.text }]}>
              {animal.characteristics?.most_distinctive_feature}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.mapButton, { backgroundColor: theme.primary }]} onPress={handleViewOnMap}>
          <Text style={[styles.mapButtonText, { color: theme.background }]}>View on Map</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={saveToCollection}>
        <Icon name="favorite" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 320,
    justifyContent: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
  },
  headerContent: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  chipText: {
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    padding: 16,
    fontSize: 16,
  },
  activeTab: {
    borderBottomWidth: 3,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  glassyCard: {
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
  },
  mapButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});

export default AnimalDetailScreen;
