import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SymplaService } from '../services/sympla.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-participants-details',
  standalone: true,
  imports: [CommonModule, NgbAlert],
  templateUrl: './event-participants-details.component.html',
  styleUrl: './event-participants-details.component.less'
})
export class EventParticipantsDetailsComponent implements OnInit, OnDestroy {
  participant: any;
  errorMessage: string | null = null;
  intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private symplaService: SymplaService,
    private router: Router
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('eventId')!;
    const participantId = this.route.snapshot.paramMap.get('participantId')!;
    this.loadParticipant(eventId, participantId);

    this.intervalId = setInterval(() => {
      this.loadParticipant(eventId, participantId);
    }, 10000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadParticipant(eventId: string, participantId: string) {
    this.symplaService.getParticipantById(eventId, participantId).subscribe(data => {
      this.participant = data.data;
    });
  }

  viewParticipants(eventId: string) {
    this.router.navigate([`events`, eventId, 'participants']);
  }

  makeCheckIn(eventId: string, participantId: string) {
    this.symplaService.makeCheckIn(eventId, participantId).subscribe(data => {
      this.participant = data.data;
      this.errorMessage = null;
    }, error => {
      this.errorMessage = error.error.message;
    }, () => {
      console.log('Check-in realizado com sucesso');
    });
  }
}
