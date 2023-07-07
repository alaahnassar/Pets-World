import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../../environment/environment';
import { AuthService } from '../../../auth.service';

@Injectable({
  providedIn: 'root',
})
export class KeeperService {
  base_url: string = `${API_URL}/keepers`;
  token!: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  getKeeperById(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.base_url + `/${id}`, { headers });
  }
  geAlltKeepers(filter: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    const params = new HttpParams({ fromObject: filter });
    return this.http.get(this.base_url, { headers, params });
  }
  updateKeeperRating(id: string, data: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return this.http.patch(this.base_url + `/${id}`, JSON.stringify(data), { headers });
  }
}
