import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface ScrapedData {
  name?: string;
  category?: string;
  ingredients?: string[];
}

interface IngredientDescriptions {
  [ingredient: string]: string;
}

const App = () => {
  const [scrapedData, setScrapedData] = useState<ScrapedData>({});
  const [ingredientDescriptions, setIngredientDescriptions] = useState<IngredientDescriptions>({});

  const apiKey = 'sk-... YOUR API KEY HERE';
  const maxRequestsPerMinute = 3;
  const requestInterval = 70_000; 

  useEffect(() => {
    // Get the active tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const url = tabs[0]?.url || '';
      if (url) {
        try {
          const response = await axios.post('http://localhost:3000/scrape', { url });
          const data: ScrapedData = response.data;
          setScrapedData(data);

          // Fetch ingredient descriptions after storing the ingredients
          if (data.ingredients) {
            fetchIngredientDescriptions(data.ingredients);
          }
        } catch (error) {
          console.error('Error scraping:', error);
        }
      }
    });

    // Set up the interceptor
    const interceptor = axios.interceptors.request.use((config) => {
      console.log('Request Payload:', config.data);
      return config;
    });

    // Clean up the interceptor on component unmount
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []); 

  const fetchIngredientDescription = async (ingredient: string) => {
    console.log('Fetching description for ingredient:', ingredient);

    try {
        const payload = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that provides information about skincare ingredients.`,
          },
          {
            role: 'user',
            content: `What is ${ingredient} in only a sentence?`,
          },
        ],
        max_tokens: 100,
      };

      
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      };

      
      const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });

      if (response.data.choices && response.data.choices.length > 0) {
        const description = response.data.choices[0].message.content.trim();
        console.log(`Fetched description for ${ingredient}:`, description);
        setIngredientDescriptions((prevDescriptions) => ({
          ...prevDescriptions,
          [ingredient]: description,
        }));
      } else {
        console.error(`Error fetching description for ${ingredient}: Empty or missing choices array.`);
        setIngredientDescriptions((prevDescriptions) => ({
          ...prevDescriptions,
          [ingredient]: 'Error: Unable to fetch description.',
        }));
      }
    } catch (error) {
      console.error(`Error fetching description for ${ingredient}:`, error);
      setIngredientDescriptions((prevDescriptions) => ({
        ...prevDescriptions,
        [ingredient]: 'Error: Unable to fetch description.',
      }));
    }
  };

  const fetchIngredientDescriptions = async (ingredients: string[]) => {
    const queue = [...ingredients];
    let requestCount = 0;

    while (queue.length > 0) {
      const ingredient = queue.shift() as string;
      await fetchIngredientDescription(ingredient);

      requestCount++;

      // Wait until the next minute if the rate limit is reached
      if (requestCount >= maxRequestsPerMinute) {
        await new Promise((resolve) => setTimeout(resolve, requestInterval));
        requestCount = 0;
      }
    }
  };

  
  console.log('Scraped Data:', scrapedData);
  console.log('Ingredient Descriptions:', ingredientDescriptions);

  return (
    <div className="app-container">
      <h1>Cosmetic Scan <span> 💄 </span></h1>
      <p className="data-item">Name: {scrapedData.name}</p>
      <p className="data-item">Category: {scrapedData.category}</p>
      <h3>Ingredient info listed below<span> 🧴 </span>:</h3>
      <div className="ingredient-list">
        {scrapedData.ingredients &&
          scrapedData.ingredients.map((ingredient, index) => (
            <div className="ingredient-container fade-in" key={index}>
              <p>{ingredient}</p>
              <p className="ingredient-description">{ingredientDescriptions[ingredient]}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;

