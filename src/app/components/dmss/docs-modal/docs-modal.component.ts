import { Component, OnInit } from "@angular/core";
import { mItemSPO } from "app/models/mItemSPO.model";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import {
  NgbDateStruct,
  NgbModal,
  NgbModalOptions,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
import { RestService } from "app/shared/services/rest.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { UserModel } from "app/models/user.model";
import { UserEditComponent } from "app/components/users/user-edit/user-edit.component";
import { ActivatedRoute, Router } from "@angular/router";
import * as swalFunctions from "../../../shared/services/sweetalert.service";
//import { FPOModel } from "app/models/procurement.model";
import { PO } from "../../../models/po.model";
@Component({
  selector: "app-docs-modal",
  templateUrl: "./docs-modal.component.html",
  providers: [RestService],
  styleUrls: [
    "./docs-modal.component.scss",
    "../../../../assets/sass/libs/datepicker.scss",
  ],
})
export class DocsModalComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    private service: RestService,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private activateRoute: ActivatedRoute,
  ) {
    this.recipeForm = this.formBuilder.group({
      chef_name: new FormControl("", [Validators.required]),
      location: new FormControl("", [Validators.required]),
      reciepe: this.formBuilder.array([
        this.formBuilder.group({
          reciepe_name: ['', Validators.required],
          ingredient: ['', Validators.required],
          cooking_time: ['', Validators.required],
        }),
      ]),
    })
  }
  swal = swalFunctions;
  statusId: string;
  dtStart: NgbDateStruct;
  dtEnd: NgbDateStruct;
  now: Date = new Date();
  status: any = [];
  FPOForm: FormGroup;
  recipeForm!: FormGroup;
  itemSPO: mItemSPO[];
  users: UserModel[];
  data: any[];
  ngOnInit(): void {
    //this.buildItemForm(this.data);
    this.initializeFPOForm();
    this.selectToday();
    this.now = new Date();
    this.getStatus();
    this.getItemSPO();

  }
  initializeFPOForm() {
    this.FPOForm = this.formBuilder.group({
      docNo: ['', Validators.required],
      docDate: [''],
      statusId: [0, Validators.required], // Default value set to 0
      arrived: ['', Validators.required],
      fpoNo: ['', Validators.required],
      pOlist: this.formBuilder.array([
        this.formBuilder.group({
          item: [1],
          poNo: [''],
          prNo: [''],
          poPath: [''],
          prPath: [''],
          jobNo: ['']
        })]),   //Initialize pOlist as a FormArray
      buyerId: [1, Validators.required],
      supplierId: [1, Validators.required],
      paymentTerm: ['', Validators.required],
      deliveryTermId: [1, Validators.required],
      isMethods: [false],
      remarks: ['']
    });
  
   // let pOlistFormArray = this.FPOForm.get('pOlist') as FormArray;
  

  }

  onSubmit() { }
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
  /*   removeItemPO(item: any) {
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
    } */
  getUsers() {
    this.service.getUsers().subscribe((user: any) => {
      this.users = user;
    });
  }
  //
  get itemControls(): any {
    return this.recipeForm.get('reciepe') as FormArray;
  }

  addItem() {
    const items = this.recipeForm.get('reciepe') as FormArray;
    if (!items.invalid) {
      items.push(
        this.formBuilder.group({
          reciepe_name: ['', Validators.required],
          ingredient: ['', Validators.required],
          cooking_time: ['', Validators.required],
        })
      );
    }
  }
  removeItem(index: any) {
    const items = this.recipeForm.get('reciepe') as FormArray;
    items.removeAt(index);
  }
  submitForm() {
    console.log(this.recipeForm.value);
  }
  //
  saveFPO() {

  }
  get pOlistControls() {
    return this.FPOForm.get('pOlist') as FormArray;
  }

  addItemPO() {
    const newItem: FormGroup = this.formBuilder.group({
      item: [this.pOlistControls.length + 1],
      poNo: [''],
      prNo: [''],
      poPath: [''],
      prPath: [''],
      jobNo: ['']
    });

    (this.FPOForm.get('pOlist') as FormArray).push(newItem);
  }

  removeItemPO(index: number): void {
    (this.FPOForm.get('pOlist') as FormArray).removeAt(index);
  }
  addUser() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: "static",
      size: "md",
    };
    const modalRef = this.modalService.open(UserEditComponent, ngbModalOptions);
    modalRef.componentInstance.id = ""; // should be the id
    modalRef.componentInstance.data = {
      username: "",
      password: "",
      name: "",
      email: "",
      roleId: 0,
      isActive: true,
    }; // should be the data
    modalRef.result
      .then((result) => {
        this.spinner.show(undefined, {
          type: "ball-triangle-path",
          size: "medium",
          bdColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          fullScreen: true,
        });
        //initial user for body
        const body = {
          username: result.username,
          password: result.password,
          name: result.name,
          email: result.email,
          isActive: result.isActive,
          roleId: result.roleId,
        };
        this.service.createUser(body).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.swal.showDialog("success", "เพิ่มข้อมูลสำเร็จแล้ว");
            this.getUsers();
          },
          (error: any) => {
            this.spinner.hide();
            this.swal.showDialog("error", "เกิดข้อผิดพลาด : " + error);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
