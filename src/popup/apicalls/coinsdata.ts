
import {Coin} from '../../models/coinmodel'


export async function fetchBotUsers(): Promise<Coin[]> {
    return  new Promise< Coin[]>((resolve, reject) => {
        fetch('http://localhost:5050/coins/')
          .then((response) => {
            resolve(response.json());
          })
          .catch((error) => {
            reject(error);
          });
      });
}


export  function GetBotList():Coin[]  {
    const botList: Coin[] = [];
    const botData = 
    fetchBotUsers()
    .then((botUsers: Coin[]) => {
        botUsers.forEach((bot) => {
            botList.push( new Coin(bot))
        });
    })
    .catch((error) => {
        console.error('Error fetching BotUsers:', error);
    });

    return botList;
};