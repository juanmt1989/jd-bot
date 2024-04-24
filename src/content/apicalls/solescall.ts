import ReactDOM from 'react-dom/client';
import React from 'react';

export const GetUserInformation = async () => {
  try {
      const response = await fetch('https://bot.solesbot.ai/home/dataHome');
      if (response.ok) {
          const data = await response.json();
          return data;
      } else {
          return {error:'Failed to fetch data'};
      }
  } catch (error) {
      return {error: `Error fetching data: '${error}'`};;
  }
}