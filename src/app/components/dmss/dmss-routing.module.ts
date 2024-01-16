import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocsListComponent } from './docs-list/docs-list.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {
        path: 'docs-list',
        component: DocsListComponent,
        data: {
          title: 'รายการซีลเข้าระบบ'
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DmssRouteModule { }
