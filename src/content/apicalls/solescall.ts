
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


export const GetLastCoinExecution = async () => {
    try {
        const response = await fetch('https://bot.solesbot.ai/robot/getManualOperation?p=0&period=7', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }
          });

        if (response.ok) {
            const data = await response.json();
            return data.result;
        } else {
            return {error:'Failed to fetch data'};
        }
    } catch (error) {
        return {error: `Error fetching data: '${error}'`};;
    }
    
  }


  export const ExecuteOperation = async () => {
    try {
        
        const response = await fetch('https://bot.solesbot.ai/robot/submitsuggestion', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: '{"amount":"300,00","idbuy":2,"idsell":1,"sug":true,"coin":2}',
          });

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


  export const GetAvailabeBalance = async () => {
    try {
        const response = await fetch('https://bot.solesbot.ai/wallet/getbalancesopman');
        if (response.ok) {
            const data = await response.json();
            
            return Math.trunc(Number(data.usdt));
        } else {
            return {error:'Failed to fetch data'};
        }
    } catch (error) {
        return {error: `Error fetching data: '${error}'`};;
    }
  
  }