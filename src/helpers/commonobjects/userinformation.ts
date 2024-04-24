class Customer {   
   
    idcustomer: string;
    customid: string;
    fullname: string;
    email: string;
    createdate: Date;


   constructor(id: string, name:string,email:string,customid:string,createdate:Date) {   
       this.idcustomer = id;  
       this.fullname = name;  
       this.email = email;
       this.customid = customid;
       this.createdate = createdate;
   }    
     
   //creating method or function   
   display():void {   
      console.log(`User information, Name '${this.fullname}', Enail:'${this.email} '.`)   
   }   
}   

export {}