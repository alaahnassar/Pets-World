import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VetRoutingModule } from './vet-routing.module';
import { VetListComponent } from '../user/vets/vet-list/vet-list.component';
import { VetDetailsComponent } from '../user/vets/vet-details/vet-details.component';
import { VetScheduleComponent } from './vet-schedule/vet-schedule.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { VetAppointmentsComponent } from './vet-appointments/vet-appointments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditVetComponent } from './edit-vet/edit-vet/edit-vet.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { VetBookingComponent } from './vet-booking/vet-booking.component';

@NgModule({
  declarations: [
    VetListComponent,
    VetDetailsComponent,
    VetScheduleComponent,
    VetAppointmentsComponent,
    EditVetComponent,
    VetBookingComponent,
  ],
  imports: [
    CommonModule,
    VetRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    MatCardModule,
    MatIconModule,
    NgxMaterialTimepickerModule,
    MatPaginatorModule,
  ],
})
export class VetModule { }
