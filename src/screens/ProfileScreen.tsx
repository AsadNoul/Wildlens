import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = () => {
  const { theme } = useTheme();
  const user = auth().currentUser;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={[styles.label, { color: theme.text }]}>Email:</Text>
        <Text style={[styles.email, { color: theme.text }]}>{user?.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 50,
    paddingBottom: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  email: {
    fontSize: 18,
  },
});

export default ProfileScreen;
