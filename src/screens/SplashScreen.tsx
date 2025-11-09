import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#2E7D32', '#FAF3E0']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.logoContainer}>
        <View style={styles.logoBackground}>
          {/* This is a simplified version of the logo */}
          <Text style={styles.logoIcon}>🐾</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>WildLens</Text>
        <Text style={styles.subtitle}>Discover the Wild Around You</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBackground: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#FAF3E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 60,
    color: '#2E7D32',
  },
  titleContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111811',
  },
  subtitle: {
    fontSize: 16,
    color: '#111811',
    marginTop: 4,
  },
});

export default SplashScreen;
