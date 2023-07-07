import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../environment/environment';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class VetAppointmentService {
  base_url: string = `${API_URL}/vet/lastAppointments`;
  second_base_url: string = `${API_URL}/vet/appointments`;
  // token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoib3duZXIiLCJpZCI6IjY0OTA4NGYwMTk1NTkyNDQ0NThhMDljZiIsImlhdCI6MTY4NzE5MjgyOH0.6wIXTzPXpGpJUqy4zs5vOZFf4Q58JtYJXXpd7BECgSc';
  token!: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  getVetAppointment(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.base_url + `/${id}`, { headers });
  }

  getVetAppointments(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.second_base_url + `/${id}`, { headers });
  }

  addVetAppointments(request_body: any, id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token}`);
    const body = request_body;
    return this.http.post(this.second_base_url + `/${id}`, request_body, { headers });
  }

  updateVetAppointment(request_body: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token}`);
    return this.http.patch(this.second_base_url, request_body, { headers });
  }

  deleteVetAppointment(id: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token}`);
    const body = { id: id };
    return this.http.delete(this.second_base_url, { headers, body });
  }

}
