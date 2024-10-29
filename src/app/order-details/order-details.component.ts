import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { SymplaService } from '../services/sympla.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, NgbAlert],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.less'
})
export class OrderDetailsComponent {
  order: any;

  constructor(
    private route: ActivatedRoute,
    private symplaService: SymplaService,
    private router: Router
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('eventId')!;
    const orderId= this.route.snapshot.paramMap.get('orderId')!;
    this.symplaService.getOrderById(eventId, orderId).subscribe(data => {
      this.order = data.data;
    });
  }

  viewOrders(eventId: string) {
    this.router.navigate([`events`, eventId, 'orders']);
  }

  viewParticipants(orderId: string) {
    const eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.router.navigate([`events`, eventId, 'orders', orderId, 'participants']);
  }
}
