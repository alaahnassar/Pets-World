import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './environment/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token!: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = authService.getToken();
  }

  register(user: any) {
    return this.http.post(`${API_URL}/register`, user);
  }

  updatePassword(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.http.patch(
      `${API_URL}/password/${this.authService.getUserId()}`,
      JSON.stringify(data),
      { headers }
    );
  }

  getUserById() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${API_URL}/user/${this.authService.getUserId()}`, {
      headers,
    });
  }
}
