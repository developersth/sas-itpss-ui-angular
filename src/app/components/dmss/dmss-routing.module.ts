import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocsListComponent } from './docs-list/docs-list.component';
import { DocsModalComponent } from './docs-modal/docs-modal.component';
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
      },
      {
        path: 'docs-modal',
        component: DocsModalComponent,
        data: {
          title: 'จัดการเอกสาร'
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
