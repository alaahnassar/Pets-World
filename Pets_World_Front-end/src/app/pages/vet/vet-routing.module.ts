import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VetDetailsComponent } from '../user/vets/vet-details/vet-details.component';
import { VetListComponent } from '../user/vets/vet-list/vet-list.component';
import { VetScheduleComponent } from './vet-schedule/vet-schedule.component';
import { VetAppointmentsComponent } from './vet-appointments/vet-appointments.component';
import { EditVetComponent } from './edit-vet/edit-vet/edit-vet.component';
import { VetBookingComponent } from './vet-booking/vet-booking.component';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   component: VetListComponent,
  // },
  // {
  //   path: 'details/:id',
  //   component: VetDetailsComponent,pathMatch: 'full'
  // },
  {
    path: 'schedule',
    component: VetScheduleComponent,
  },
  {
    path: 'appointments',
    component: VetAppointmentsComponent,
  },
  {
    path: 'edit',
    component: EditVetComponent,
  },
  {
    path: 'appointments',
    component: VetAppointmentsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['owner'] },
  },
  {
    path: 'booking',
    component: VetBookingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['owner'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VetRoutingModule { }
