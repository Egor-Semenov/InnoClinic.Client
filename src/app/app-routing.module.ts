import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionistsListComponent } from './components/receptionists-list/receptionists-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "receptionists", component: ReceptionistsListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
