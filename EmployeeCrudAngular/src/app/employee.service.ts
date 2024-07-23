import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrlEmployee = 'https://localhost:7150/api/Employee';

  constructor(private http: HttpClient, private datepipe: DatePipe) {}
  getAllEmployee(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.apiUrlEmployee + '/getall')
      .pipe(
        map((data: Employee[]) =>
          data.map(
            (item: Employee) =>
              new Employee(
                item.id,
                item.name,
                this.datepipe
                  .transform(item.createdDate, 'dd/MM/yyyy HH:mm:ss')
                  ?.toString()
              )
          )
        )
      );
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(
      this.apiUrlEmployee + '/getbyid/?id=' + employeeId
    );
  }
  createEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Employee>(
      this.apiUrlEmployee + '/create',
      employee,
      httpOptions
    );
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put<Employee>(
      this.apiUrlEmployee + '/update',
      employee,
      httpOptions
    );
  }

  deleteEmployeeById(employeeid: number) {
    let endPoints = '/posts/1';
    return this.http.delete(this.apiUrlEmployee + '/Delete/?id=' + employeeid);
  }
}
