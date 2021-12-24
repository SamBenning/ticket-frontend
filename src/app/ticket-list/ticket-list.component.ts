import { Component, OnInit } from '@angular/core';
import { TicketService } from '../service/ticket.service';
import { Ticket } from '../interface/ticket';
import { Status } from '../enum/status.enum';
import { tick } from '@angular/core/testing';

  @Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    styleUrls: ['./ticket-list.component.scss']
  })
  export class TicketListComponent implements OnInit {

    tickets!: Array<Ticket>;

    constructor(
      private ticketService: TicketService,
    ) { }

    fetchTickets(): void {
      this.ticketService.tickets$.subscribe( (data) => {
        this.tickets = data.data.tickets as Array<Ticket>;
      })
    }

    ngOnInit(): void {
      this.fetchTickets();
    }

    delete(ticket): void {
      this.ticketService.delete$(ticket.id).subscribe( (data) => {
        console.log(data.timeStamp);
        this.fetchTickets();

      });
    }

    setStatus(statusString: string, ticket): void {
      const statusEnum = (<any>Status)[statusString];
      const updatedTicket: Ticket = {
        id: ticket.id,
        briefDescription: ticket.briefDescription,
        detailedDescription: ticket.detailedDescription,
        ticketStatus: statusString
      };
      this.ticketService.update$(updatedTicket).subscribe( (data) => {
        console.log(data.timeStamp);
        this.fetchTickets();
      })
      console.log(statusEnum);
    }

  }
