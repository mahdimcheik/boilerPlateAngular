import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientMainComponent } from './pages/client-main/client-main.component';
import { ListDishesComponent } from './pages/list-dishes/list-dishes.component';
import { ListDrinksComponent } from './pages/list-drinks/list-drinks.component';

const routes: Routes = [
  {
    path: '',
    component: ClientMainComponent,
    children: [
      {
        path: 'dishes',
        component: ListDishesComponent,
      },
      {
        path: 'drinks',
        component: ListDrinksComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
