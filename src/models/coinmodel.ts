


class Coin {

    id : number;
    solesid:number;
    name: string;
    abbr: string;
    tolerance: number;
    max_amount:number;

    constructor(coin:any) {   
        this.id =coin._id;
        this.solesid =coin.solesid;
        this.name =coin.name;
        this.abbr =coin.abbr;
        this.tolerance =coin.tolerance;
        this.max_amount =coin.max_amount;
    }

    display():void {   
        console.log(`User information, Name '${this.name}', tolerance:'${this.tolerance} '.`)   
    }   

    
}

export {Coin}
