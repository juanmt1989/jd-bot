import React, { useEffect, useState } from "react";
import {BotUser} from '../../models/botusermodel'



export const GetUserInformation = async () => {
    try {
        const response = await fetch('http://localhost:5050/users/');
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

  export const GetCustomName= async (gender:string) => {
    try {
        const response = await fetch('https://randomuser.me/api/?gender='+gender);
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

export  function GetBotList():BotUser[]  {
    const botList: BotUser[] = [];
    const botData = 
    fetchBotUsers()
    .then((botUsers: BotUser[]) => {
        botUsers.forEach((bot) => {
            botList.push( new BotUser(bot))
        });
    })
    .catch((error) => {
        console.error('Error fetching BotUsers:', error);
    });

    return botList;
};


export async function fetchBotUsers(): Promise<BotUser[]> {
    return  new Promise< BotUser[]>((resolve, reject) => {
        fetch('http://localhost:5050/botusers/')
          .then((response) => {
            resolve(response.json());
          })
          .catch((error) => {
            reject(error);
          });
      });
}
