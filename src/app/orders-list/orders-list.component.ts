import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { SymplaService } from '../services/sympla.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, NgbAlert, FormsModule],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.less']
})
export class OrdersListComponent {
  eventId: string | undefined;
  orders: any[] = [];
  filteredOrders: any[] = [];
  searchTerm: string = '';
  searchInput: string = ''; // Variável separada para a entrada da barra de busca
  currentPage: number = 1;
  pageSize: number = 10;
  cancelledFilter: string = 'include';
  totalOrders: number = 0;

  constructor(
    private route: ActivatedRoute,
    private symplaService: SymplaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.loadOrders();
  }

  loadOrders() {
    this.symplaService.getOrdersByEvent(this.eventId!, this.currentPage, this.pageSize, this.cancelledFilter).subscribe(data => {
      this.orders = data.data;
      this.filteredOrders = this.orders;
      this.totalOrders = data.pagination.quantity;
    });
  }

  viewDetails(orderId: string) {
    this.router.navigate([`events`, this.eventId, 'orders', orderId]);
  }

  searchOrder() {
    if (this.searchInput.trim() === '') {
      this.loadOrders();
    } else {
      this.symplaService.getOrderById(this.eventId!, this.searchInput).subscribe(data => {
        this.orders = [data.data];
        this.filteredOrders = this.orders;
      });
    }
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchOrder();
    }
  }

  filterOrders() {
    if (this.searchTerm) {
      this.filteredOrders = this.orders.filter(order =>
        order.buyer_first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.id.toString().includes(this.searchTerm)
      );
    } else {
      this.filteredOrders = this.orders;
    }
  }

  nextPage() {
    this.currentPage++;
    this.loadOrders();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadOrders();
    }
  }
}
