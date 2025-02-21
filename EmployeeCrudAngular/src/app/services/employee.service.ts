import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from '../../environments/environment';

@Injectable()
export class EmployeeService {
  apiUrlEmployee = environment.API_URL;

  constructor(private http: HttpClient) {}
  getAllEmployee(searchText?: string) {
    return this.http.get(
      this.apiUrlEmployee + '/employee/getall/?searchText=' + searchText
    );
  }

  getEmployeeById(id: number) {
    return this.http.get(this.apiUrlEmployee + '/employee/getbyid/?id=' + id);
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.apiUrlEmployee + '/employee/create', employee);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.apiUrlEmployee + '/employee/update', employee);
  }

  deleteEmployeeById(id: number) {
    return this.http.delete(this.apiUrlEmployee + '/employee/delete/?id=' + id);
  }
}
