import {Status} from "../enum/status.enum";

export interface Ticket {
    id: number;
    briefDescription: string;
    detailedDescription: string;
    ticketStatus: string;
}