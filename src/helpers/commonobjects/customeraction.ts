

export enum CustomerAction {
    GetCustomer = "GetCustomer",
    DeleteCustomer = "DeleteCustomer",
    SaveCustomer = "SaveCustomer"
} 
export  type CustomerMessage = {
    from: string
    to: string
    action: CustomerAction
}


