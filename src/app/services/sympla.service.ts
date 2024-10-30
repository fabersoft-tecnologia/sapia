import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SymplaService {
  private apiUrl = "https://api.sympla.com.br/public/v4/events";
  private apiUrlv3 = "https://api.sympla.com.br/public/v3/events";
  /*
  private apiToken =
    "1be88945fd97c7ebf600d2437daf024d15925626691f60a57fb502f52f6b6e4e";
*/

  private apiToken = '7617a33f0b3798fd4d401923ace8d22e0eab094fa1bfaf92a6e18d5e901b058c';


  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: {
        s_token: this.apiToken,
      },
    };
  }

  private getPaginatedUrl(
    url: string,
    page: number,
    pageSize: number,
    cancelledFilter: string = "include"
  ): string {
    return `${url}?page=${page}&page_size=${pageSize}&cancelled_filter=${cancelledFilter}`;
  }

  getEvents(
    page: number = 1,
    pageSize: number = 20,
    cancelledFilter: string = "include"
  ): Observable<any> {
    const url = this.getPaginatedUrl(
      this.apiUrl,
      page,
      pageSize,
      cancelledFilter
    );
    return this.http.get(url, this.getHeaders());
  }

  getEventById(
    eventId: string,
    page: number = 1,
    pageSize: number = 20,
    cancelledFilter: string = "include"
  ): Observable<any> {
    const url = this.getPaginatedUrl(
      `${this.apiUrl}/${eventId}`,
      page,
      pageSize,
      cancelledFilter
    );
    return this.http.get(url, this.getHeaders());
  }

  getOrdersByEvent(
    eventId: string,
    page: number = 1,
    pageSize: number = 20,
    cancelledFilter: string = "include"
  ): Observable<any> {
    const url = this.getPaginatedUrl(
      `${this.apiUrlv3}/${eventId}/orders`,
      page,
      pageSize,
      cancelledFilter
    );
    return this.http.get(url, this.getHeaders());
  }

  getOrderById(
    eventId: string,
    orderId: string,
    page: number = 1,
    pageSize: number = 20,
    cancelledFilter: string = "include"
  ): Observable<any> {
    const url = this.getPaginatedUrl(
      `${this.apiUrlv3}/${eventId}/orders/${orderId}`,
      page,
      pageSize,
      cancelledFilter
    );
    return this.http.get(url, this.getHeaders());
  }

  getParticipantsByOrder(
    eventId: string,
    orderId: string,
    page: number = 1,
    pageSize: number = 20,
    cancelled: boolean = true
  ): Observable<any> {
    const url = `${this.apiUrlv3}/${eventId}/orders/${orderId}/participants?page=${page}&page_size=${pageSize}&cancelled=${cancelled}`;
    return this.http.get(url, this.getHeaders());
  }

  getParticipantsByEvent(
    eventId: string,
    page: number = 1,
    pageSize: number = 20,
    cancelledFilter: string = "include"
  ): Observable<any> {
    const url = this.getPaginatedUrl(
      `${this.apiUrlv3}/${eventId}/participants`,
      page,
      pageSize,
      cancelledFilter
    );
    return this.http.get(url, this.getHeaders());
  }

  getParticipantById(
    eventId: string,
    participantId: string,
    page: number = 1,
    pageSize: number = 20,
    cancelledFilter: string = "include"
  ): Observable<any> {
    const url = this.getPaginatedUrl(
      `${this.apiUrlv3}/${eventId}/participants/${participantId}`,
      page,
      pageSize,
      cancelledFilter
    );
    return this.http.get(url, this.getHeaders());
  }

  getParticipantByTicketNumber(
    eventId: string,
    ticketNumber: string,
    page: number = 1,
    pageSize: number = 20,
    cancelledFilter: string = "include"
  ): Observable<any> {
    const url = this.getPaginatedUrl(
      `${this.apiUrlv3}/${eventId}/participants/ticketNumber/${ticketNumber}`,
      page,
      pageSize,
      cancelledFilter
    );
    return this.http.get(url, this.getHeaders());
  }

  getAffiliatesByEvent(
    eventId: string,
    page: number = 1,
    pageSize: number = 20
  ): Observable<any> {
    const url = this.getPaginatedUrl(
      `${this.apiUrlv3}/${eventId}/affiliates`,
      page,
      pageSize
    );
    return this.http.get(url, this.getHeaders());
  }

  makeCheckIn(eventId: string, participantId: string): Observable<any> {
    const url = `${this.apiUrlv3}/${eventId}/participants/${participantId}/checkin`;
    return this.http.post(url, {}, this.getHeaders());
  }

  makeCheckInByTicketNumber(
    eventId: string,
    ticketNumber: string
  ): Observable<any> {
    const url = `${this.apiUrlv3}/${eventId}/participants/ticketNumber/${ticketNumber}/checkIn`;
    return this.http.post(url, {}, this.getHeaders());
  }
}
