import { Ticket } from "./ticket";

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: { tickets?: Ticket[], ticket?: Ticket };
}