import { AuthService } from './../../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { API_URL } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class EditVetService {
  private baseUrl = API_URL; // Replace with your actual backend API URL
  // token: string =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoib3duZXIiLCJpZCI6IjY0OTA4NGYwMTk1NTkyNDQ0NThhMDljZiIsImlhdCI6MTY4NzE5MjgyOH0.6wIXTzPXpGpJUqy4zs5vOZFf4Q58JtYJXXpd7BECgSc';
  token!: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  updateVetById(vetData: any): Observable<any> {
    const url = `${this.baseUrl}/vets`; // URL with the vet ID in it
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.http.patch(url, vetData, { headers }).pipe(
      catchError(this.handleError) // Handle any errors that occur during the HTTP request
    );
  }
  getVetById(id: string) {
    const url = `${this.baseUrl}/vets`; // URL with the vet ID in it
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.get(url + `/${id}`, { headers });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.'); // Customize the error message as needed
  }
}
