import { Component, OnInit } from '@angular/core';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss']
})
export class DocsListComponent implements OnInit {

  constructor() { }
  pageSize: number = 10;
  pageSizes: any = [10, 20, 50, 100];
  data: any;
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.data = [
      {
        docno: 'DOC-20240101-0001',
        pono: 'SPO1214-001',
        supplierName: 'FMC',
        status: 'Sending PO',
        totalPrice: '999 USD',
      },
      {
        docno: 'DOC-20240101-0002',
        pono: 'SPO1214-002',
        supplierName: 'Chemtech',
        status: 'Sending PO',
        totalPrice: '999 USD',
      },
      {
        docno: 'DOC-20240101-0003',
        pono: 'SPO1214-001',
        supplierName: 'FMC',
        status: 'Sending PO',
        totalPrice: '999 USD',
      },
      {
        docno: 'DOC-202401010003',
        pono: 'SPO1214-001',
        supplierName: 'FMC',
        status: 'Sending PO',
        totalPrice: '999 USD',
      },
      {
        docno: 'DOC-202401010004',
        pono: 'SPO1214-001',
        supplierName: 'FMC',
        status: 'Sending PO',
        totalPrice: '999 USD',
      },
      {
        docno: 'DOC-202401010006',
        pono: 'SPO1214-001',
        supplierName: 'FMC',
        status: 'Sending PO',
        totalPrice: '999 USD',
      },
      {
        docno: 'DOC-202401010007',
        pono: 'SPO1214-001',
        supplierName: 'FMC',
        status: 'Sending PO',
        totalPrice: '999 USD',
      },
      {
        docno: 'DOC-202401010008',
        pono: 'SPO1214-001',
        supplierName: 'FMC',
        status: 'Sending PO',
        totalPrice: '999 USD',
      },
      {
        docno: 'DOC-202401010009',
        pono: 'SPO1214-001',
        supplierName: 'FMC',
        status: 'Sending PO',
        totalPrice: '999 USD',
      },
      {
        docno: 'DOC-202401010010',
        pono: 'SPO1214-001',
        supplierName: 'FMC',
        status: 'Sending PO',
        totalPrice: '999 USD',
      }
    ]
  }

}
