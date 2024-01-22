import { Injectable } from "@angular/core";

import { Observable, of, forkJoin } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "environments/environment";
import { forEach } from "core-js/core/array";

//----------------------------------------------------------------
import { UserModel } from "app/models/user.model";
import { Roles } from "app/models/roles.model";


@Injectable()
export class RestService {
  constructor(private http: HttpClient) {}
  private readonly apiUrl = `${environment.apiUrl}`;
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/pdf" }),
    responseType: "arraybuffer" as "json",
  };
  private httpOptionPDF = {
    headers: new HttpHeaders({ "Content-Type": "application/pdf" }),
    responseType: "arraybuffer" as "json",
  };
  //----------------------------------------------------------------
  private userUrl = `${this.apiUrl}/users`;
  private rolesUrl = `${this.apiUrl}/roles`;

  //----------------------------------------------------------------
  getFullNameLocalAuthen() {
    return localStorage.getItem(environment.fullNameLocalAuthen);
  }
  getToken() {
    return localStorage.getItem(environment.keyLocalAuthenInfo);
  }
  //----------------------------------------------------------------
  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.rolesUrl}/GetRole`);
  }
  //----------------------------------------------------------------
  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.userUrl}/GetUser`);
  }
  getUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.userUrl}/${id}`);
  }
  createUser(body: any): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.userUrl}/AddUser`, body);
  }
  updateUser(id: string, body: any): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.userUrl}/EditUser/${id}`, body);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.userUrl}/DeleteUser/${id}`);
  }
}
