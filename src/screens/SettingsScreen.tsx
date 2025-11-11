import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  const handleLogout = () => {
    auth().signOut();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={{ color: theme.text }}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBucfzRVABliY-VEVozz3k6iYkxmsFDy7xjYjHEZnlnZEPYzIw1XTIAawJnQoGnyQsXHNTXD2P-eylokw0-veeHwnN49T14zgw48pjUjMoxvQUIbs2L1Gf56YkRV_b15c9IO5U2CT_UUDtc_40xpPY9jjGN3achR4kqN9mmVspn5657iF2iYRuL21I7mAFg4sb1SvEexcHU8rq_6_UI-E87dU2JLTeB4v2ThWtKGHp40lpPfya4PiSDH9uSqpOD3ytOw4bxYBXW-g54' }}
          style={styles.avatar}
        />
        <View>
          <Text style={[styles.profileName, { color: theme.text }]}>Elara Vance</Text>
          <Text style={styles.profileEmail}>elara.vance@example.com</Text>
        </View>
      </View>

      <View style={styles.settingsList}>
        <SettingItem title="Account" icon="person" theme={theme} />
        <SettingItem title="App Preferences" icon="tune" theme={theme} />
        <SettingItem title="Notifications" icon="notifications" theme={theme} />
        <SettingItem title="Privacy & Security" icon="privacy_tip" theme={theme} />
        <View style={styles.settingItem}>
          <Text style={{ color: theme.text }}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>WildLens v1.2.3</Text>
    </ScrollView>
  );
};

const SettingItem = ({ title, icon, theme }) => (
  <TouchableOpacity style={styles.settingItem}>
    <Text style={{ color: theme.text }}>{icon}</Text>
    <Text style={[styles.settingItemText, { color: theme.text }]}>{title}</Text>
    <Text style={{ color: theme.text }}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '500',
  },
  profileEmail: {
    color: '#6b7280',
  },
  settingsList: {
    marginTop: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  settingItemText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '500',
  },
  versionText: {
    textAlign: 'center',
    color: '#9ca3af',
    marginBottom: 24,
  },
});

export default SettingsScreen;
