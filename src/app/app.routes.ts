import { Routes } from '@angular/router';
import { EventParticipantsComponent } from './event-participants/event-participants.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventParticipantsDetailsComponent } from './event-participants-details/event-participants-details.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

export const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'events', component: EventListComponent },
  { path: 'events/:eventId', component: EventDetailsComponent },
  { path: 'events/:eventId/participants', component: EventParticipantsComponent },
  { path: 'events/:eventId/orders/:orderId/participants', component: EventParticipantsComponent },
  { path: 'events/:eventId/participants/:participantId', component: EventParticipantsDetailsComponent },
  { path: 'events/:eventId/affiliates', component: AffiliatesComponent },
  { path: 'events/:eventId/orders', component: OrdersListComponent },
  { path: 'events/:eventId/orders/:orderId', component: OrderDetailsComponent },
];
