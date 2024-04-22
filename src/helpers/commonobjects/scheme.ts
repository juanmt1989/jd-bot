import React from "react";


type Customer = {
    idcustomer: string,
    solesid: string,
    fullname: string,
    email: string
};


type operation = {
    idcustomer: string,
    block: block,
    balance: number,
    processing: number,
    nextcoin: coin,
    //"now": "2024/04/19 20:56:58"
    servertime: Date,
    //"date": "2024/04/19 21:39:23"
    duedate: Date,
    //"dateinit": "2024/04/19 19:15:23"
    lastoperation:Date
}

type coin = {
    id : number,
    name: string,
    abbr: string,
    lastattempt: Date,
    nextattempt: Date, 
}

type block = {
    idblock:number,
    blockname: string,
    indexcoin : number,
    current: coin
}

type ordercoin =  [coin,[coin,coin,coin,coin,coin],coin]

type profits = {

    //"ID": 5184985,
    idprofit: number,
    // "Key": "YVHNWW8P48WI129197",
    soleshash: string,
    // "Date": "19/04/2024", // "Hour": "19:15",
    executiontime: Date,
    // "Exchanges": "Kucoin | Binance",
    exchanges: string,
    // "Prices": "1,12883307 | 1,13851041",
    prices: string,
    // "Amount": "300.00000000",
    amount: number,
    // "Percent": "0,86",
    total_roi: number,
   // "percentwin": "0,52",
    exchange: string

    real_earn: number
    crypto : coin,
    block: block

}
    
