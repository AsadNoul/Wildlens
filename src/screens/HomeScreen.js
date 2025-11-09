import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const recentlyIdentified = [
  {
    name: 'Red Panda',
    scientificName: 'Ailurus fulgens',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMRyMUwaQVPD9nbVVzeqnwYMGNQ1PiUlzk67HGI45iIXNnlge3_tTHI0c9eWxs3PjWq_AOUxVCr2iPldSwhk6RH76gobsIJy47VvTQV2-sBCtTphjO0OybnDtNCBn8J24Ft2Mbk3qaOK_4hA_oW3G370GtJoR8MrtZ3lsyG2n_SbR9WBMMbaqydaUZhdoX1-57BdAqvoETujqy0JDcASTAVgWWllLGxPcvvuI9KLHKHGYa8wkPMJHN-zwUi0oSsjEjsPrajmgGvyBG',
  },
  {
    name: 'Fennec Fox',
    scientificName: 'Vulpes zerda',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVdxFGwv8T4y0R9C9N6ZN3Dod7K8aILYO6BDiiviaxlD8-n4gKAFPdRu63oyvxUbjoB_qh7ldKUYInt3pzeV-8ifgbXH5xp6eBOApmuxNWsdEQ0WVZywwalUgbzLB85k9chsCMEKd5xnTvjqCmKZrVmfjm1UckbtZFlFVmE2E_e45CL0vqmA_bzv2XYCL-PNhhKUrJ00tMkIGN2ymJh0gEX_PYLRF1wTDy-LkyoQdkUDswqTTgLphvXdBkCjh5FdaGmAHSEHcbWkoN',
  },
  {
    name: 'Monarch',
    scientificName: 'Danaus plexippus',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDApBQa5qqxNaWiMVIthYWwxJPrRcuGLH-UoODkQatyXO6rl6tJej7bBahQQtiR5xJ0A4DFhmnIZSYss0uJ3PW2gWqRHKHI2aBW9h8mOm-IdskIrcKZNCjw4s8MixuQ06q-6B9ReyfU7ogBLwpccSPo0G1YWTA3Sn0l2vIQzIlNzbOZpd5iYV_nO5pAIBY6WeecwiAaM52Wzmk9YoZHQ_rKMu4dCEjrHDn8tp2lhjYDSerBQAww0qjgcuAVNz9SQjgXTHHHhCoVzhwi',
  },
];

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Welcome, Alex</Text>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search animals or use camera"
          placeholderTextColor="#5e8760"
        />
      </View>

      <Text style={styles.sectionTitle}>Recently Identified</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {recentlyIdentified.map((item, index) => (
          <View key={index} style={styles.glassCard}>
            <ImageBackground source={{ uri: item.imageUrl }} style={styles.cardImage} imageStyle={{ borderRadius: 12 }}>
            </ImageBackground>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.scientificName}</Text>
          </View>
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
