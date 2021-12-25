import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Ticket } from '../interface/ticket';

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
  ) { }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.ticketForm.value);
  }

}
