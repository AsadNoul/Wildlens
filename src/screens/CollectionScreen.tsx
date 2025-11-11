import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const CollectionScreen = () => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { theme } = useTheme();

  const loadCollection = useCallback(async () => {
    setRefreshing(true);
    try {
      const storedCollection = await AsyncStorage.getItem('collection');
      if (storedCollection) {
        setCollection(JSON.parse(storedCollection));
      }
    } catch (error) {
      // Error retrieving data
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCollection();
    }, [loadCollection])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigation.navigate('AnimalDetail', { animal: item })}
    >
      <ImageBackground source={{ uri: item.imageUrl }} style={styles.gridImage} imageStyle={{ borderRadius: 16 }}>
        <View style={styles.gridTextContainer}>
          <Text style={styles.gridTitle}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>My Collection</Text>
      {collection.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.text }]}>Your collection is empty.</Text>
          <Text style={[styles.emptySubtext, { color: theme.tabInactive }]}>
            Go identify some animals to add them to your collection!
          </Text>
        </View>
      ) : (
        <FlatList
          data={collection}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadCollection} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 16,
    paddingTop: 50,
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

export default CollectionScreen;
