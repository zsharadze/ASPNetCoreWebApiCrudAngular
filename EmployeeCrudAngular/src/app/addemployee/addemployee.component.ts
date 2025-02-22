import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [EmployeeService],
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css'],
})
export class AddemployeeComponent implements OnInit {
  newEmployee: Employee = new Employee(0, '', null);
  submitBtnText: string = 'Create';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const employeeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (employeeId) this.getEmployee(Number(employeeId));
  }

  saveEmployee() {
    if (!this.newEmployee.name) return;

    if (this.newEmployee.id === 0) {
      this.employeeService
        .createEmployee(this.newEmployee)
        .subscribe(() => this.router.navigate(['/']));
    } else {
      this.employeeService
        .updateEmployee(this.newEmployee)
        .subscribe(() => this.router.navigate(['/']));
    }
    this.submitBtnText = '';
  }

  getEmployee(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe((res) => {
      this.newEmployee = { ...res } as Employee;
      this.submitBtnText = 'Edit';
    });
  }
}
