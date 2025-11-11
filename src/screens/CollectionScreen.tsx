import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const CollectionScreen = () => {
  const [collection, setCollection] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Collection</Text>
      <FlatList
        data={collection}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadCollection} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f6',
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111811',
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
});

export default CollectionScreen;
