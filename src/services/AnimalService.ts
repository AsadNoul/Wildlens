// @ts-ignore
import { API_NINJAS_KEY, UNSPLASH_ACCESS_KEY, ANIMAL_DETECT_KEY, ANIMAL_DISCOVERY_KEY } from '@env';

const useMockData = !API_NINJAS_KEY || !UNSPLASH_ACCESS_KEY || !ANIMAL_DETECT_KEY || !ANIMAL_DISCOVERY_KEY;

const mockAnimals = [
  {
    name: 'Lion',
    taxonomy: { scientific_name: 'Panthera leo' },
    locations: ['Africa', 'Asia'],
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeaf781f76?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Fox',
    taxonomy: { scientific_name: 'Vulpes vulpes' },
    locations: ['Everywhere'],
    imageUrl: 'https://images.unsplash.com/photo-1534237935408-b00d46781747?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const getAnimals = async (name: string) => {
  if (useMockData) {
    return mockAnimals.filter(animal => animal.name.toLowerCase().includes(name.toLowerCase()));
  }

  try {
    const animalResponse = await fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
      headers: { 'X-Api-Key': API_NINJAS_KEY },
    });
    const animalData = await animalResponse.json();

    const animalsWithImages = await Promise.all(
      animalData.map(async (animal: any) => {
        const imageResponse = await fetch(
          `https://api.unsplash.com/search/photos?query=${animal.name}&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        const imageData = await imageResponse.json();
        const imageUrl = imageData.results[0]?.urls?.regular;
        const galleryImageUrls = imageData.results?.slice(0, 10).map((result: any) => result.urls.regular);
        return { ...animal, imageUrl, galleryImageUrls };
      })
    );

    return animalsWithImages;
  } catch (error) {
    console.error('Error fetching animal data:', error);
    return [];
  }
};

export const identifyAnimal = async (imageUri: string) => {
  if (useMockData) {
    return 'Lion'; // Mock response
  }

  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    const response = await fetch('https://www.animaldetect.com/api/v1/detect', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ANIMAL_DETECT_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const data = await response.json();
    return data[0]?.taxa?.species;
  } catch (error) {
    console.error('Error identifying animal:', error);
    return null;
  }
};

export const getAnimalHabitat = async (name: string) => {
  if (useMockData) {
    return {
      habitat: 'Forests, mountains, and grasslands',
      diet: 'Omnivore',
    };
  }

  try {
    const response = await fetch(`https://api.zylalabs.com/v1/animals/${name}/habitat`, {
      headers: { 'Authorization': `Bearer ${ANIMAL_DISCOVERY_KEY}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching animal habitat:', error);
    return null;
  }
};
