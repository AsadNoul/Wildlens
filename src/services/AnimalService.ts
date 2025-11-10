// @ts-ignore
import { API_NINJAS_KEY, UNSPLASH_ACCESS_KEY } from '@env';

const useMockData = !API_NINJAS_KEY || !UNSPLASH_ACCESS_KEY;

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
    // 1. Fetch animal data from API Ninjas
    const animalResponse = await fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
      headers: { 'X-Api-Key': API_NINJAS_KEY },
    });
    const animalData = await animalResponse.json();

    // 2. For each animal, fetch an image from Unsplash
    const animalsWithImages = await Promise.all(
      animalData.map(async (animal: any) => {
        const imageResponse = await fetch(
          `https://api.unsplash.com/search/photos?query=${animal.name}&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        const imageData = await imageResponse.json();
        const imageUrl = imageData.results[0]?.urls?.regular;

        return { ...animal, imageUrl };
      })
    );

    return animalsWithImages;
  } catch (error) {
    console.error('Error fetching animal data:', error);
    return [];
  }
};
