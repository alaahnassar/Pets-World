import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingComponent } from './landing/landing.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LandingComponent, UpdatePasswordComponent],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class PagesModule { }
