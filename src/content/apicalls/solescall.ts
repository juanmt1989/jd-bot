import ReactDOM from 'react-dom/client';
import React from 'react';
import  jdbotScheme,  {userformation} from './../../helpers/commonobjects/scheme'

 const GetUserInformation =() => {
    let result = {}
    
    let userInformation : userformation
    const fetchData = async () => {
        try {
          const response = await fetch('https://bot.solesbot.ai/home/dataHome');
          if (response.ok) {
            
            result = await response.json();

          } else {
            console.error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      return result;
};
