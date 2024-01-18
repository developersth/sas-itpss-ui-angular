import { Component, OnInit } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { mItemSPO } from "app/models/mItemSPO.model";
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-docs-modal",
  templateUrl: "./docs-modal.component.html",
  styleUrls: [
    "./docs-modal.component.scss",
    "../../../../assets/sass/libs/datepicker.scss",
  ],
})
export class DocsModalComponent implements OnInit {
  constructor(public formBuilder: FormBuilder) {
    this.docForm = this.formBuilder.group({
      statusId: [0],
    });
  }
  statusId:string;
  dtStart: NgbDateStruct;
  dtEnd: NgbDateStruct;
  now: Date = new Date();
  status: any = [];
  docForm: FormGroup;
  itemSPO: mItemSPO[];
  ngOnInit(): void {
    this.selectToday();
    this.now = new Date();
    this.getStatus();
    this.getItemSPO();
    this.buildItemForm();
  }
  private buildItemForm() {
    this.docForm = this.formBuilder.group({
      statusId: [0],
    });
  }
  onSubmit() {}
  getItemSPO() {
    return (this.itemSPO = [
      {
        item: 1,
        poNo: "",
        poFile: "",
        prNo: "",
        prFile: "",
        jobNo: "",
      }
    ]);
  }
  getStatus() {
    return (this.status = [
      { statusId: 1, statusName: "Sending PO" },
      { statusId: 2, statusName: "Order Acknowleged" },
      { statusId: 3, statusName: "Ready to Shipped" },
      { statusId: 4, statusName: "On the Way" },
      { statusId: 5, statusName: "Clearance" },
      { statusId: 6, statusName: "Received" },
      { statusId: 7, statusName: "Completed" },
    ]);
  }
  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }
  // Selects today's date
  selectToday() {
    this.dtStart = {
      year: this.now.getFullYear(),
      month: this.now.getMonth() + 1,
      day: this.now.getDate(),
    };
  }

  // Custom Day View Starts
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }
  removeItemPO(item: any) {
    let index = this.itemSPO.indexOf(item);
    this.itemSPO.splice(index, 1);
  }
  addItemPO(){
    this.itemSPO.push({
      item: null,
      poNo: '',
      poFile: '',
      prNo: '',
      prFile: '',
      jobNo: '',
    });
  }
}
