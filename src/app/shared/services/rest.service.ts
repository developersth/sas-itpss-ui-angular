import { Injectable } from "@angular/core";

import { Observable, of, forkJoin } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "environments/environment";
import { forEach } from "core-js/core/array";

//----------------------------------------------------------------
import { User } from "../../models/user.model";
import { Roles } from "app/models/roles.model";
import { Truck } from "../../models/truck.model";
import { Response } from "../../models/response.model";
import { SealTypes } from "app/models/seal-types.model";
import { SealStatus } from "app/models/seal-status.model";

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
    return this.http.get<Roles[]>(`${this.rolesUrl}/GetRoles`);
  }
  //----------------------------------------------------------------
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`);
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }
  createUser(body: any): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/register`, body);
  }
  updateUser(id: string, body: any): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${id}`, body);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.userUrl}/${id}`);
  }
}
