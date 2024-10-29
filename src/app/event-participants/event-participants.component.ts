import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SymplaService } from '../services/sympla.service';
import { CommonModule } from '@angular/common';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-participants',
  standalone: true,
  imports: [CommonModule, NgbAlert, FormsModule],
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.less']
})
export class EventParticipantsComponent implements OnInit {
  eventId: string | undefined;
  orderId: string | undefined;
  participants: any[] = [];
  searchTerm: string = '';
  searchInput: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  cancelledFilter: string = 'include';
  totalParticipants: number = 0;
  ticketNumber: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private symplaService: SymplaService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.orderId = this.route.snapshot.paramMap.get('orderId')!;
    this.loadParticipants();
  }

  loadParticipants() {
    if (this.orderId) {
      this.symplaService.getParticipantsByOrder(this.eventId!, this.orderId, this.currentPage, this.pageSize, true).subscribe(data => {
        this.participants = data.data;
        this.totalParticipants = data.pagination.quantity;
      });
    } else {
      this.symplaService.getParticipantsByEvent(this.eventId!, this.currentPage, this.pageSize, this.cancelledFilter).subscribe(data => {
        this.participants = data.data;
        this.totalParticipants = data.pagination.quantity;
      });
    }
  }

  viewDetails(participantId: string) {
    this.router.navigate([`events`, this.eventId, 'participants', participantId]);
  }

  searchParticipant() {
    if (this.searchInput.trim() === '') {
      this.loadParticipants();
    } else {
      this.symplaService.getParticipantByTicketNumber(this.eventId!, this.searchInput).subscribe(data => {
        this.participants = [data.data];
        this.totalParticipants = 1;
      });
    }
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchParticipant();
    }
  }

  filteredParticipants() {
    return this.participants.filter(participant =>
      (participant.first_name + ' ' + participant.last_name)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  nextPage() {
    this.currentPage++;
    this.loadParticipants();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadParticipants();
    }
  }

  openCheckInModal() {
    this.modalService.open('#checkInModal');
  }

  makeCheckIn() {
    const eventId = this.eventId!;
    this.symplaService.makeCheckInByTicketNumber(eventId, this.ticketNumber).subscribe(response => {
      alert('Check-in realizado com sucesso!');
      this.modalService.dismissAll();
    }, error => {
      this.errorMessage = error.error.message;
      alert(this.errorMessage);
    });
  }
}