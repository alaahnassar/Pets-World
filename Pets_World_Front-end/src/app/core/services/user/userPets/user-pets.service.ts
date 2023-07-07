import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnerPetsComponent } from 'src/app/pages/user/owner-pets/owner-pets.component';
import { AuthService } from '../../auth.service';
import { API_URL } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = API_URL;
  token!: string;


  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  getAllPetsByOwnerId(ownerId: string): Observable<any[]> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any[]>(`${this.apiUrl}/owners/pets/${ownerId}`, { headers });
  }

  createPet( pet: any,ownerId: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return this.http.post<any>(`${this.apiUrl}/owners/pets/${ownerId}`, pet, { headers });
  }

  deletePet(petId: string,ownerId:string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<any>(`${this.apiUrl}/owners/pets/${ownerId}/${petId}`, { headers });
  }

  updatePet( pet: any, petId: string,ownerId:string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return this.http.patch<any>(`${this.apiUrl}/owners/pets/${ownerId}/${petId}`,pet, { headers });
  }
}
