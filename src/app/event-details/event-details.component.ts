import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SymplaService } from '../services/sympla.service';
import { CommonModule } from '@angular/common';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, NgbAlert],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.less'
})
export class EventDetailsComponent implements OnInit {
  event: any;

  constructor(
    private route: ActivatedRoute,
    private symplaService: SymplaService,
    private router: Router
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.symplaService.getEventById(eventId).subscribe(data => {
      this.event = data.data;
    });
  }

  viewParticipants(eventId: string) {
    this.router.navigate([`events`, eventId, 'participants']);
  }

  viewAffiliates(eventId: string) {
    this.router.navigate([`events`, eventId, 'affiliates']);
  }

  viewOrders(eventId: string) {
    this.router.navigate([`events`, eventId, 'orders']);
  }
}
