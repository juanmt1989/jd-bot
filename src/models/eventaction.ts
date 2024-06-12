
export  type CustomerMessage = {
    from: string
    to: string
    action: any
}


export enum CustomerAction {
    GetCustomer = "GetCustomer",
    DeleteCustomer = "DeleteCustomer",
    SaveCustomer = "SaveCustomer"
} 

export enum BidAction {
    GetBidRules = "GetBidRules",
} 

export enum Conexion {
    Start = "StarConexion",
    End = "EndConexion",
} 