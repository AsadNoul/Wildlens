import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useTheme } from '../context/ThemeContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
// @ts-ignore
import { GOOGLE_WEB_CLIENT_ID } from '@env';

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState('Sign In');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { theme } = useTheme();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Account created successfully!');
      setActiveTab('Sign In');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const { identityToken } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken);
      await auth().signInWithCredential(appleCredential);
    } catch (error) {
      if (error.code !== appleAuth.Error.CANCELED) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {activeTab === 'Sign In' ? 'Sign In to WildLens' : 'Create an Account'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.tabInactive }]}>
            {activeTab === 'Sign In'
              ? 'Welcome back! Please enter your details.'
              : 'Get started with your WildLens journey.'}
          </Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Sign In' && styles.activeTab]}
            onPress={() => setActiveTab('Sign In')}
          >
            <Text style={[styles.tabText, { color: theme.text }]}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Sign Up' && styles.activeTab]}
            onPress={() => setActiveTab('Sign Up')}
          >
            <Text style={[styles.tabText, { color: theme.text }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
            placeholder="Enter your email"
            placeholderTextColor={theme.tabInactive}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
            placeholder="Enter your password"
            placeholderTextColor={theme.tabInactive}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity>
          <Text style={[styles.forgotPassword, { color: theme.primary }]}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.signInButton, { backgroundColor: theme.primary }]}
            onPress={activeTab === 'Sign In' ? handleSignIn : handleSignUp}
          >
            <Text style={[styles.signInButtonText, { color: theme.background }]}>
              {activeTab === 'Sign In' ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.divider} />
            <Text style={[styles.orText, { color: theme.tabInactive }]}>OR</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: theme.card }]}
            onPress={handleGoogleSignIn}
          >
            <Text style={{ color: theme.text }}>Continue with Google</Text>
          </TouchableOpacity>
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: theme.card }]}
              onPress={handleAppleSignIn}
            >
              <Text style={{ color: theme.text }}>Continue with Apple</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  main: {
    width: '100%',
    maxWidth: 384,
    alignSelf: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    gap: 16,
  },
  input: {
    height: 56,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  forgotPassword: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 16,
  },
  signInButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#d1d5db',
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  socialButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;
