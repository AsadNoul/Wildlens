import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWBt4kl1Oi-UEGrqwCuxx-v6jX9H8sfYJ9USIHY7VOF49LhZ3da8GPovb2FMbptZu-hkj2FwNZHOooxWq-8h0TOEt6cECw6dDqy-Lo4DzB-cz0elZJ1OgGLOxqRNJtKFdD-47wMG13uVoAShMnIIXznyBgqo7vOyfpE57hR_mDsAJYziYYIzV2hpeb-u5iXkAlW7oHUZpanKLpszgYhd3ePiAyaDOZRvxxKdz84YaLaCQkOgEINUH13cspjqYnbeTr-lvUqD6OiBX9' }}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <Text style={styles.headline}>Snap & Identify</Text>
        <Text style={styles.bodyText}>
          Use your camera to instantly identify any animal you encounter.
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.pageIndicators}>
          <View style={[styles.indicator, styles.indicatorActive]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f6',
    padding: 16,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 320,
    borderRadius: 24,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111811',
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 8,
  },
  bodyText: {
    fontSize: 16,
    color: '#111811',
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  footer: {
    paddingBottom: 16,
  },
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2f7f3320',
  },
  indicatorActive: {
    backgroundColor: '#2f7f33',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  skipButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    color: '#111811',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#2f7f33',
    marginLeft: 12,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
