import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const AnimalDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { animal } = route.params;

  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.title}>{animal.name}</Text>
        <Text style={styles.subtitle}>{animal.taxonomy?.scientific_name}</Text>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{animal.characteristics?.prey}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {/* Simplified tab view */}
        <Text style={[styles.tab, styles.activeTab]}>Overview</Text>
        <Text style={styles.tab}>Habitat</Text>
        <Text style={styles.tab}>Gallery</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.glassyCard}>
          <Text style={styles.cardTitle}>Quick Facts</Text>
          <Text style={styles.cardText}>
            Locations: {animal.locations?.join(', ')}
          </Text>
        </View>
        <View style={styles.glassyCard}>
          <Text style={styles.cardTitle}>Characteristics</Text>
          <Text style={styles.cardText}>
            {animal.characteristics?.most_distinctive_feature}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.mapButton}>
        <Text style={styles.mapButtonText}>View on Map</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f6',
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
    color: '#6b7280',
  },
  chip: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  chipText: {
    color: '#166534',
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
    color: '#6b7280',
  },
  activeTab: {
    color: '#111811',
    borderBottomWidth: 3,
    borderBottomColor: '#2f7f33',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  glassyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
    backgroundColor: '#2f7f33',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AnimalDetailScreen;
