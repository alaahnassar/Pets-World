import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { KeeperRoutingModule } from './keeper-routing.module';
import { KeeperListComponent } from '../keepers/keeper-list/keeper-list.component';
import { KeeperDetailsComponent } from '../keepers/keeper-details/keeper-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { KeeperScheduleComponent } from './keeper-schedule/keeper-schedule.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { KeeperAppointmentsComponent } from './keeper-appointments/keeper-appointments.component';

@NgModule({
  declarations: [
    KeeperListComponent,
    KeeperDetailsComponent,
    KeeperScheduleComponent,
    KeeperAppointmentsComponent
  ],
  imports: [
    CommonModule,
    KeeperRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class KeeperModule { }
