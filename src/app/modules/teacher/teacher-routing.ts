import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutTeacherComponent } from './pages/layout-teacher/layout-teacher.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutTeacherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
