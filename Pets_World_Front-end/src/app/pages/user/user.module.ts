import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
// import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UserScheduleComponent } from './user-schedule/user-schedule.component';
import { EditOwnerComponent } from './edit-owner/edit-owner.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'primeng/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from "@angular/material/paginator";
import { OwnerPetsComponent } from "./owner-pets/owner-pets.component";

@NgModule({
  declarations: [HomeComponent, UserScheduleComponent, EditOwnerComponent, OwnerPetsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    // CardModule,
    MatCheckboxModule,
    ButtonModule,
    MatIconModule,
    MatPaginatorModule,

  ],

})
export class UserModule { }
