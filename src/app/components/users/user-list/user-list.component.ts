import { Component, OnInit } from "@angular/core";
import { UserModel } from "../../../models/user.model";
import { RestService } from "app/shared/services/rest.service";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { UserEditComponent } from "../user-edit/user-edit.component";
import { NgxSpinnerService } from "ngx-spinner";
import * as swalFunctions from "../../../shared/services/sweetalert.service";
import { Roles } from "app/models/roles.model";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
  providers:[RestService]
})
export class UserListComponent implements OnInit {
  users: UserModel[];
  txtNA:string= 'ไม่ระบุ';


  swal = swalFunctions;

  constructor(
    private service: RestService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.service.getUsers().subscribe((data:any) => {
      if (data){
        this.users = data;
        console.log(data);
      }

    });
  }
  deleteUser(id: any) {
    console.log(id);
    this.swal
      .ConfirmText("แจ้งเตือนการลบข้อมูล", "คุณต้องการลบข้อมูลหรือไม่?")
      .then((res) => {
        if (res) {
          this.service.deleteUser(id).subscribe(
            (res: any) => {
              this.swal.showDialog("success", "ลบข้อมูลเรียบร้อยแล้วแล้ว");
              this.getUsers();
            },
            (error: any) => {
              this.swal.showDialog("error", "เกิดข้อผิดพลาด:" + error);
            }
          );
        }
      });
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
            //this.spinner.hide();
            this.swal.showDialog("error", "เกิดข้อผิดพลาด : " + error);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  editData(item: any) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: "static",
      size: "md",
    };
    const modalRef = this.modalService.open(UserEditComponent, ngbModalOptions);
    modalRef.componentInstance.id = item.id; // should be the id
    modalRef.componentInstance.data = item;
    console.log(modalRef.componentInstance.data);
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
          roleId: result.roleId,
          isActive: result.isActive,
          /*roleId: {
            name: result.roleId,
          },*/
        };
        console.log(result.roleId);
        this.service.updateUser(item.id, body).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.swal.showDialog("success", "แก้ไขข้อมูลสำเร็จแล้ว");
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
