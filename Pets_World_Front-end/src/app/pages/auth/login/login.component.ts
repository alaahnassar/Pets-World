import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.email!.value;
      const password = this.password!.value;

      this.authService.login(email, password).subscribe({
        next: async (data) => {
          // localStorage.setItem('token', data.token);
          await this.saveTokenToLocalStorage(data.token);
          console.log('Successfully logged');
          this.authService.getTokenData();
          // localStorage.setItem('role', this.authService.role);
          if (
            this.authService.role === 'owner' ||
            this.authService.role === 'keeper'
          ) {
            this.router.navigate(['/user']);
            // window.location.reload();
          } else if (this.authService.role === 'vet') {
            this.router.navigate(['/vet/schedule']);
          }
        },
        error: (err) => {
          this.loginError = 'Invalid email or password.';
        },
      });
    } else {
      // Mark form fields as touched to display validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  saveTokenToLocalStorage(token: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        localStorage.setItem('token', token);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
