import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PipeModule } from 'app/shared/pipes/pipe.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { DocsListComponent } from './docs-list/docs-list.component';
import { DmssRouteModule } from './dmss-routing.module';
import { DocsModalComponent } from './docs-modal/docs-modal.component';
@NgModule({
  declarations: [
    DocsListComponent,
    DocsModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    PipeModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    DatePipe,
    NgSelectModule,
    DmssRouteModule,
    NgxPaginationModule
  ]
})
export class DmssModule { }
