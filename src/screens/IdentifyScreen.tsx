import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { identifyAnimal, getAnimals } from '../services/AnimalService';
import { useNavigation } from '@react-navigation/native';

const IdentifyScreen = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [isActive, setIsActive] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const camera = useRef<Camera>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkPermission = async () => {
      const permission = await requestPermission();
      if (permission) {
        setIsActive(true);
      }
    };
    checkPermission();
  }, [requestPermission]);

  const takePhoto = async () => {
    if (camera.current) {
      const file = await camera.current.takePhoto();
      setPhoto(file);
    }
  };

  const handleIdentify = async () => {
    if (photo) {
      setIsLoading(true);
      const animalName = await identifyAnimal(photo.path);
      if (animalName) {
        const animalData = await getAnimals(animalName);
        if (animalData.length > 0) {
          navigation.navigate('AnimalDetail', { animal: animalData[0] });
        }
      }
      setIsLoading(false);
      setPhoto(null); // Reset for next identification
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No camera permission</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>No camera device found</Text>
      </View>
    );
  }

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: `file://${photo.path}` }} style={StyleSheet.absoluteFill} />
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            <TouchableOpacity style={styles.retakeButton} onPress={() => setPhoto(null)}>
              <Text style={styles.retakeButtonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.identifyButton} onPress={handleIdentify}>
              <Text style={styles.identifyButtonText}>Identify</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo={true}
      />
      <View style={styles.captureButtonContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={takePhoto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: 'gray',
  },
  retakeButton: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  retakeButtonText: {
    fontSize: 20,
    color: 'black',
  },
  identifyButton: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    backgroundColor: '#2f7f33',
    padding: 20,
    borderRadius: 10,
  },
  identifyButtonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default IdentifyScreen;
