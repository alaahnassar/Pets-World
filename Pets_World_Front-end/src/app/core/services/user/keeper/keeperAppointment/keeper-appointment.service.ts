import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../../environment/environment';
import { AuthService } from '../../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class KeeperAppointmentService {
  base_url: string = `${API_URL}/keeper/appointments`;
  token!: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  getKeeperAppointment(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.base_url + `/${id}`, { headers });
  }

  addKeeperAppointments(request_body: any, id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token}`);
    const body = request_body;
    return this.http.post(this.base_url + `/${id}`, request_body, { headers });
  }

  updateKeeperAppointment(request_body: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token}`);
    return this.http.patch(this.base_url, request_body, { headers });
  }

  deleteKeeperAppointment(id: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token}`);
    const body = { id: id };
    return this.http.delete(this.base_url, { headers, body });
  }

}
