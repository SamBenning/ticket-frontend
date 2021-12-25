import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomResponse } from '../interface/custom-response';
import { Ticket } from '../interface/ticket';
import { TicketService } from '../service/ticket.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  ticketForm = this.formBuilder.group(<Ticket>
  {
    id: null,
    briefDescription: '',
    detailedDescription: '',
    ticketStatus: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.ticketForm.value);
    this.ticketService.save$(this.ticketForm.value).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['/ticket-list']);

  }

}
