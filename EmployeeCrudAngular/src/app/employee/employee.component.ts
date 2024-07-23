import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: Observable<Employee[]> = new Observable<Employee[]>();
  imgLoadingDisplay: string = 'none';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployess();
  }

  getEmployess() {
    this.employees = this.employeeService.getAllEmployee();
    return this.employees;
  }

  addEmployee() {
    this.router.navigate(['/addemployee']);
  }

  deleteEmployee(id: number) {
    this.employeeService
      .deleteEmployeeById(id)
      .subscribe((result) =>
        this.getEmployess().subscribe(
          (result) => (this.imgLoadingDisplay = 'none')
        )
      );
    this.imgLoadingDisplay = 'inline';
  }

  editEmployee(id: number) {
    this.router.navigate(['/addemployee'], { queryParams: { id: id } });
  }

  searchItem(value: string) {
    this.employeeService.getAllEmployee().subscribe((res) => {
      this.employees = of(res);

      this.employees
        .pipe(
          map((plans) =>
            plans.filter((results, emp) => results.name.indexOf(value) != -1)
          )
        )
        .subscribe((results) => {
          let employeeList: Employee[] = [];
          for (let index = 0; index < results.length; index++) {
            employeeList.push(
              new Employee(
                results[index].id,
                results[index].name,
                results[index].createdDate
              )
            );
          }
          this.employees = of(employeeList);
        });
    });
  }
}
