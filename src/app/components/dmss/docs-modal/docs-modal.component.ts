import { Component, OnInit } from "@angular/core";
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
import { FPOModel } from "app/models/fpo.model";
//import { FPOModel } from "app/models/procurement.model";
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
    public fb: FormBuilder,
    private service: RestService,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private activateRoute: ActivatedRoute
  ) {
    //fpo form
  }
  swal = swalFunctions;
  statusId: string;
  dtStart: NgbDateStruct;
  dtEnd: NgbDateStruct;
  now: Date = new Date();
  status: any = [];
  fpoForm: FormGroup;
  recipeForm!: FormGroup;
  users: UserModel[];
  data: any[];
  fpoModel: FPOModel;
  form: FormGroup;
  ngOnInit(): void {
    //this.buildItemForm(this.data);
    this.initializeFPOForm();
    this.selectToday();
    this.now = new Date();
    this.getStatus();
  }
  initializeFPOForm() {
    this.fpoForm = this.fb.group({
      docNo: new FormControl(""),
      docDate: new FormControl(""),
      statusId: new FormControl(0), // Default value set to 0
      arrived: new FormControl(""),
      pOlist: this.fb.array([
        this.fb.group({
          item: [1],
          poNo: [""],
          prNo: [""],
          poPath: [null],
          prPath: [null],
          jobNo: [""],
        }),
      ]), //Initialize pOlist as a FormArray
      buyerId: new FormControl(0, [Validators.required]),
      supplierId: new FormControl(0, [Validators.required]),
      paymentTerm: new FormControl(""),
      deliveryTermId: new FormControl(0),
      isMethods: new FormControl(false),
      remarks: new FormControl("")

    });
    this.form = this.fb.group({
      name: [''],
      photo: [''],
      guide: ['']
    })
    // let pOlistFormArray = this.FPOForm.get('pOlist') as FormArray;
  }

  onSubmit() { }
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
  submitForm() {
    let formData: any = new FormData(); Object.keys(this.form.controls).forEach(formControlName => {
      formData.append(formControlName, this.form.get(formControlName).value);
    });
/*     this.http.post('http://localhost:4200/api/trip', formData)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      ) */
  }

  uploadFile(event, fileType: string) {
    this.updateFile(event, fileType);
  }
  private updateFile(event: Event, formControlName: string) {
    const file = (event.target as HTMLInputElement).files[0]; 
    //this.form.controls[formControlName].patchValue([file]); 
    this.form.get('photo').setValue(file);
    this.form.get(formControlName).updateValueAndValidity()
  }

  // Method to handle file change for poPath
  onPoPathFileChange(event: Event,index:number) {
    const file = (event.target as HTMLInputElement).files[0];
     //this.fpoForm.get('pOlist').get(`${index}`).get(formControlName).setValue(file);
     this.fpoForm.get('pOlist').get(`${index}`).get('poPath').setValue(file);  
     //this.fpoForm.get('pOlist').get(`${index}`).get('poPath').updateValueAndValidity() 
  }


  saveFPO() {
    this.spinner.show(undefined, {
      type: "ball-triangle-path",
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      fullScreen: true,
    });

    // Convert the form data to FormData
    let formData = new FormData();

    // Iterate over the top-level form controls
    Object.keys(this.fpoForm.controls).forEach((key) => {
      const control = this.fpoForm.get(key);

      if (control instanceof FormControl) {
        // Append scalar values directly
        if (control.value !== null && control.value) {
          if (key === "docDate") {
            const { year, month, day } = this.fpoForm.get("docDate").value as {
              year: number;
              month: number;
              day: number;
            };
            formData.set(key, `${year}-${month}-${day}`);
          } else {
            formData.set(key, control.value);
          }
        }
      } else if (control instanceof FormGroup) {
        // If the control is a FormGroup, iterate over its controls
        Object.keys(control.controls).forEach((nestedKey) => {
          const nestedControl = control.get(nestedKey);
          formData.set(`${key}.${nestedKey}`, nestedControl.value);
        });
      }
    });
    this.pOlistControls.forEach((control, index) => {
      formData.set(`pOlist[${index}].item`, control.get('item').value);
      formData.set(`pOlist[${index}].poNo`, control.get('poNo').value);
      formData.set(`pOlist[${index}].prNo`, control.get('prNo').value);
      formData.set(`pOlist[${index}].jobNo`, control.get('jobNo').value);
      formData.set(`pOlist[${index}].poPath`, control.get('poPath').value);
      formData.set(`pOlist[${index}].prPath`, control.get('prPath').value);
    });
    // Convert docDate to a formatted date string
    // formData.set('isMethods', 'true');
    // formData.set('statusId', '2');

    console.log(formData);

    // Now, send the form data to your API
    this.service.saveFPO(formData).subscribe(
      (res) => {
        console.log("Form submitted successfully", res);
        this.spinner.hide();
      },
      (error) => {
        console.error("Error submitting form", error);
        this.spinner.hide();
      }
    );
  }

  get pOlistControls() {
    return (this.fpoForm.get("pOlist") as FormArray).controls;
  }

  addItemPO() {
    const newItem: FormGroup = this.fb.group({
      item: [this.pOlistControls.length + 1],
      poNo: [""],
      prNo: [""],
      poPath: [""],
      prPath: [""],
      jobNo: [""],
    });

    (this.fpoForm.get("pOlist") as FormArray).push(newItem);
  }

  removeItemPO(index: number): void {
    (this.fpoForm.get("pOlist") as FormArray).removeAt(index);
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
