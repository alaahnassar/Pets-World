import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from './../../environment/environment';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  base_url = `${API_URL}/blog`
  token!: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  getDogs(params: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.base_url, { headers, params });
  }
}
