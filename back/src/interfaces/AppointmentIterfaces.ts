export interface Appointment {
    id: number
    date : Date
    time :string
    userId : number
    status: status
}

export enum status {
    Active ="Active",
    Cancelled = "cancelled"
}