import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { SymplaService } from '../services/sympla.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-affiliates',
  standalone: true,
  imports: [CommonModule, NgbAlert, FormsModule],
  templateUrl: './affiliates.component.html',
  styleUrl: './affiliates.component.less'
})
export class AffiliatesComponent {
  searchTerm: string = '';
  affiliates: any;
  filteredAffiliates: any[] = [];
  currentPage: number = 1;
  pageSize: number = 200;

  constructor(
    private route: ActivatedRoute,
    private symplaService: SymplaService,
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.loadAffiliates(eventId);
  }

  loadAffiliates(eventId: string) {
    this.symplaService.getAffiliatesByEvent(eventId, this.currentPage, this.pageSize).subscribe(data => {
      this.affiliates = data.data;
      this.filteredAffiliates = this.affiliates;
    });
  }

  filterAffiliates(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredAffiliates = this.affiliates.filter((affiliate: any) =>
      affiliate.name.toLowerCase().includes(term)
    );
  }

  nextPage() {
    this.currentPage++;
    const eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.loadAffiliates(eventId);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      const eventId = this.route.snapshot.paramMap.get('eventId')!;
      this.loadAffiliates(eventId);
    }
  }
}
