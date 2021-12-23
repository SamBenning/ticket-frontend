import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { CustomResponse } from './interface/custom-response';
import { TicketService } from './service/ticket.service';
import { AppState } from './interface/app-state';
import { DataState } from './enum/data-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appState$: Observable<AppState<CustomResponse>>;
  constructor(
    private ticketService: TicketService
    ) {}

  ngOnInit(): void {
    this.appState$ = this.ticketService.tickets$
    .pipe(
      map(response => {
        return { dataState: DataState.LOADED_STATE, appData: response }
      }),
      startWith({dataState: DataState.LOADING_STATE}),
      catchError((error: string) => {
        return of({dataState: DataState.ERROR_STATE, error})
      })
    )
  }
}
