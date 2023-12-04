import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';
import { map } from "rxjs/operators";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  url = 'https://localhost:44320/api/Employee';
  constructor(private http: HttpClient, private datepipe: DatePipe) { }
  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url).pipe(map((data: Employee[]) =>
      data.map(
        (item: Employee) =>
          new Employee(item.id, item.name, this.datepipe.transform(item.createdDate, 'dd/MM/yyyy HH:mm:ss')?.toString())
      )
    )
    );
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.url + '/' + employeeId);
  }
  createEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Employee>(this.url,
      employee, httpOptions);
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Employee>(this.url+"/"+employee.id,
      employee, httpOptions);
  }
  deleteEmployeeById(employeeid: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + "/" + employeeid,
      httpOptions);
  }
}  