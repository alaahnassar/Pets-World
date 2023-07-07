import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from '../../../environment/environment';
import { AuthService } from '../../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class KeeperBookingService {
  base_url: string = `${API_URL}/keeper/booking`;
  token!: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  getBookingByKeeperId(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.base_url + `/${id}`, { headers });
  }

  addKeeperBooking(data: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return this.http.post(this.base_url, JSON.stringify(data), { headers });
  }

  getKeeperSchedule(filter: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const params = new HttpParams({ fromObject: filter });
    return this.http.get(this.base_url, { headers, params });
  }

  deleteVetBooking(id: any, data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token}`);
    const params = new HttpParams({ fromObject: data });
    return this.http.delete(this.base_url + `/${id}`, { headers, params });
  }
}
