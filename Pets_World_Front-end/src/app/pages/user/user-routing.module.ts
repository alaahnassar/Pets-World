import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserScheduleComponent } from './user-schedule/user-schedule.component';
import { EditOwnerComponent } from './edit-owner/edit-owner.component';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { VetListComponent } from "./vets/vet-list/vet-list.component";
import { KeeperDetailsComponent } from "./keepers/keeper-details/keeper-details.component";
import { KeeperListComponent } from "./keepers/keeper-list/keeper-list.component";
import { VetDetailsComponent } from "./vets/vet-details/vet-details.component";
import { OwnerPetsComponent } from "./owner-pets/owner-pets.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'schedule',
    component: UserScheduleComponent,
  },
  {
    path: 'keeper',
    loadChildren: () =>
      import('./keeper/keeper.module').then((keeper) => keeper.KeeperModule),
    canActivate: [AuthGuard],
    data: { roles: ['keeper'] }
  },
  {
    path: 'edit',
    component: EditOwnerComponent,
  },
  {
    path: 'vets',
    component: VetListComponent,
  },
  {
    path: 'vets/details/:id',
    component: VetDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'keepers',
    component: KeeperListComponent,
  },
  {
    path: 'keepers/details/:id',
    component: KeeperDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'pets',
    component: OwnerPetsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
