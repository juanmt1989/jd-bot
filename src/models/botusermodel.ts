class BotUser {   

    BotId: string;
    gender: string;
    name: string;
    nickname: string;
    inverstmen: number;
    balance: number;
    today: number;
    current: number;
    bid: number;
    lastcoin: string;
    nextcoin: string;
    earn: number;
    warning: boolean;
    idcustomer: string;


   
   
   constructor(bot:any) {   
    this.BotId=bot._id;
    this.gender=bot.gender;
    this.name=bot.name;
    this.nickname=bot.nickname;
    this.inverstmen=bot.inverstmen;
    this.balance=bot.balance;
    this.today=bot.today;
    this.current=bot.current;
    this.bid=bot.bid;
    this.lastcoin=bot.lastcoin;
    this.nextcoin=bot.nextcoin;
    this.earn=bot.earn;
    this.warning=bot.warning;
    this.idcustomer=bot.idcustomer;
   }

   //creating method or function   
   display():void {   
      console.log(`User information, Name '${this.nickname}', gender:'${this.gender} '.`)   
   }   
}   

export {BotUser}