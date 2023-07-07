import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { API_URL } from 'src/app/core/services/environment/environment';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  roleObservable: Observable<string> =
    this.authService.roleSubject.asObservable();
  role: any = '';
  userData!: any;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.authService.getTokenData();
    this.role = this.authService.role;
    this.roleObservable.subscribe((role) => {
      this.role = role;
    });
    this.getUserData();
  }


  getUserData() {
    this.userService.getUserById().subscribe(
      (data: any) => {
        this.userData = data;
        this.userData.userImage = `${API_URL}/${this.userData.image}`;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    window.location.reload();
  }
}
