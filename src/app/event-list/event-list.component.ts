import { Component, OnInit } from '@angular/core';
import { SymplaService } from '../services/sympla.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgbAlert, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.less'
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 180;
  cancelledFilter: string = 'included';

  constructor(private symplaService: SymplaService, private router: Router) {}

  ngOnInit() {
    this.loadEvents();
  }

  viewDetails(eventId: string) {
    this.router.navigate([`events`, eventId]);
  }

  filteredEvents() {
    return this.events.filter(event => event.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  nextPage() {
    this.currentPage++;
    this.loadEvents();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEvents();
    }
  }

  loadEvents() {
    this.symplaService.getEvents(this.currentPage, this.pageSize, this.cancelledFilter).subscribe(data => {
      this.events = data.data;
    });
  }

}
