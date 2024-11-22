import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutClientComponent } from './pages/layout-client/layout-client.component';
import { PersonnalInfosComponent } from './pages/personnal-infos/personnal-infos.component';
import { AdressesComponent } from './pages/adresses/adresses.component';

const routes: Routes = [
  {
    path: ':id',
    component: LayoutClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
