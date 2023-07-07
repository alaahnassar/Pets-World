import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeeperScheduleComponent } from './keeper-schedule/keeper-schedule.component';
import { KeeperAppointmentsComponent } from './keeper-appointments/keeper-appointments.component';

const routes: Routes = [
  {
    path: 'schedule', component: KeeperScheduleComponent
  },
  {
    path: 'appointments', component: KeeperAppointmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeeperRoutingModule { }
