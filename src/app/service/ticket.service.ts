import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Status } from '../enum/status.enum';
import { CustomResponse } from '../interface/custom-response';
import { Ticket } from '../interface/ticket';

@Injectable({ providedIn: 'root'})
export class TicketService {
    private readonly apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    tickets$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/ticket/list`)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );

    save$ = (ticket: Ticket) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/ticket/save`, ticket)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );

    filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
        subscriber => {
            console.log(response);
            subscriber.next(
                status === Status.ALL ?  { ...response, message: `Tickets filtered by ${status} status`} :
                {
                    ...response,
                    message: response.data.tickets
                    .filter(ticket => ticket.ticketStatus === status).length > 0 ?
                    `Tickets filtered by ${status}` : `No tickets of ${status} found`,
                    data: { tickets: response.data.tickets
                        .filter(ticket => ticket.ticketStatus === status) 
                    }
                }
            )
            subscriber.complete();
        }
    )
    .pipe(
        tap(console.log),
        catchError(this.handleError)
    );

    update$ = (ticket: Ticket) => <Observable<CustomResponse>>
    this.http.put<CustomResponse>(`${this.apiUrl}/ticket/put`, ticket)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    
    delete$ = (ticketId: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${this.apiUrl}/ticket/delete/${ticketId}`)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    
    private handleError(error: HttpErrorResponse): Observable<never> {
        console.log(error);
        return throwError (`Error occurred - Error code: ${error.status}`);
    }
}